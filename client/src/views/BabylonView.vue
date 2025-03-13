<template>
  <canvas ref="bjsCanvas" width="500" height="500"></canvas>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { Engine } from "@babylonjs/core";
import { Playground } from "../babylon/babylon-config"; 

export default {
  name: "BabylonScene",
  setup() {
    const bjsCanvas = ref(null);
    let engine = null; // Stocke l'instance de l'engine

    onMounted(() => {
      if (!bjsCanvas.value) return;

      // Initialisation de Babylon.js
      engine = new Engine(bjsCanvas.value, true);
      const scene = Playground.CreateScene(engine, bjsCanvas.value);

      // Démarre la boucle de rendu
      engine.runRenderLoop(() => {
        scene.render();
      });

      // Ajuste la taille sur redimensionnement
      window.addEventListener("resize", () => engine.resize());
    });

    // Nettoyage de l'engine lorsque le composant est démonté
    onUnmounted(() => {
      if (engine) {
        engine.dispose();
      }
    });

    return { bjsCanvas };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>

  
  