import fs from 'fs'
import path from 'path'

export function recFindByExt(base: string, ext: string, past_files?: string[], past_result?: string[]): string[] {
  const files = past_files ?? fs.readdirSync(base)
  var result: string[] = past_result ?? []

  files.forEach(
    function (file: string) {

      const newbase = path.join(base, file);

      if (fs.statSync(newbase).isDirectory()) result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result)
      else {
        if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
          result.push(newbase)
        }
      }
    }
  )
  return result
}