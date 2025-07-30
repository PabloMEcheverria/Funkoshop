import supabase from '../../config/supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';

export async function replaceImagesByUrls(urlsAnteriores, nuevosArchivos) {
  try {
    if (
      !Array.isArray(urlsAnteriores) ||
      urlsAnteriores.length !== 2 ||
      !nuevosArchivos ||
      nuevosArchivos.length !== 2
    ) {
      throw new Error('Se requieren dos URLs y dos archivos.');
    }

    const nuevasUrls = [];

    for (let i = 0; i < 2; i++) {
      const urlAntigua = urlsAnteriores[i];
      const archivoNuevo = nuevosArchivos[i];
      const partes = new URL(urlAntigua).pathname.split('/');
      const bucketIndex = partes.indexOf('products-images');
      if (bucketIndex === -1) throw new Error('Bucket no encontrado en la URL.');

      const nombreAntiguo = decodeURIComponent(partes.slice(bucketIndex + 1).join('/'));
      const extension = archivoNuevo.name.split('.').pop() || 'jpg';
      const nombreNuevo = `${i === 0 ? 'front' : 'back'}-${uuidv4()}.${extension}`;

      const { error: deleteError } = await supabase.storage
        .from('products-images')
        .remove([nombreAntiguo]);
      if (deleteError) throw deleteError;

      const { error: uploadError } = await supabase.storage
        .from('products-images')
        .upload(nombreNuevo, archivoNuevo, {
          contentType: archivoNuevo.type,
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products-images')
        .getPublicUrl(nombreNuevo);

      nuevasUrls.push(data?.publicUrl || null);
    }

    return nuevasUrls;
  } catch (err) {
    console.error('❌ Error al reemplazar imágenes:', err);
    return [null, null];
  }
}