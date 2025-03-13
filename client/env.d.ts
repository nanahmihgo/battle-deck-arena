/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BASE_URL: string;
    // Ajoute ici toutes les variables d'environnement utilisées dans `import.meta.env`
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
