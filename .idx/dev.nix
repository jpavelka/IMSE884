{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.python312
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];
  idx.workspace.onCreate = {
    npm-install = "npm install";
  };
  idx.workspace.onStart = {
    npm-run-dev = "npm run dev";
  };
}