// export const configuration = () => ({
//     env: process.env.NODE_ENV,
//     port: parseInt(process.env.PORT, 10) || 3001,
//   });


import { existsSync } from 'fs';
import { resolve } from 'path';
  
export function getEnvPath(dest: string): string {
    const env: string | undefined = process.env.NODE_ENV;
    const fallback: string = resolve(`${dest}/.env`);
    const filename: string = env ? `${env}.env` : 'development.env';
    let filePath: string = resolve(`${dest}/${filename}`);
    
    if (!existsSync(filePath)) {
      filePath = fallback;
    }
 
    return filePath;
  }  