import { supabase } from '@/lib/supabase'

export const getPublicUrl = (filePath, bucket = 'movies') => {
  if (!filePath) return ''
  if (filePath.startsWith('http')) return filePath
  const { data, error } = supabase.storage.from(bucket).getPublicUrl(filePath)
  if (error) {
    console.error('Error getting public URL:', error)
    return ''
  }
  return data.publicUrl
}
