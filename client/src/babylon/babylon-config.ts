/// <reference lib="dom" />
import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial, Color3, HemisphericLight, Mesh } from "@babylonjs/core";

export class Playground {
  public static CreateScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
      const scene = new Scene(engine);

      // 🎥 Création de la caméra
      const camera = new FreeCamera("camera1", new Vector3(0, 12, 2), scene);
      camera.setTarget(Vector3.Zero());
      // camera.attachCo
      // ntrol(canvas, true);

      // 🎇 Lumière principale
      const light = new HemisphericLight("light", new Vector3(1, 2, 1), scene);
      light.intensity = 0.6;

      // 🏗️ Création du sol (plateau)
      const ground = MeshBuilder.CreateGround("ground", { width: 12, height: 12 }, scene);

      // 🎨 Matériau du plateau
      const groundMaterial = new StandardMaterial("groundMaterial", scene);
      groundMaterial.diffuseColor = new Color3(255 / 255, 140 / 255, 0 / 255); // Neon orange
      ground.material = groundMaterial;

      // 📌 Positionnement des emplacements de cartes
      const cardWidth = 1.4;
      const cardHeight = 2.6;
      const spacing = 0.5;
      const rowOffset = 0;

      /**
       * Crée un emplacement de carte sur le plateau.
       * @param name Nom de l'emplacement.
       * @param x Position X.
       * @param z Position Z.
       * @returns L'objet Mesh de l'emplacement de carte.
       */
      const createCardSlot = (name: string, x: number, z: number): Mesh => {
          const slot = MeshBuilder.CreatePlane(name, { width: cardWidth, height: cardHeight }, scene);
          slot.position = new Vector3(x, 0.01, z);
          slot.rotation.x = Math.PI / 2;

          // Style des emplacements
          const slotMaterial = new StandardMaterial(name + "Mat", scene);
          slotMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2);
          slotMaterial.alpha = 0.5;
          slot.material = slotMaterial;

          return slot;
      };

      // Création des emplacements pour chaque joueur
      const player1Slots: Mesh[] = [];
      const player2Slots: Mesh[] = [];

      for (let i = 0; i < 5; i++) {
          const x = -4 + i * (cardWidth + spacing);

          // Player 1 (en bas du plateau)
          player1Slots.push(createCardSlot(`P1_Champion_${i}`, x, -3));
          player1Slots.push(createCardSlot(`P1_Magic_${i}`, x, -3 + rowOffset));

          // Player 2 (en haut du plateau)
          player2Slots.push(createCardSlot(`P2_Champion_${i}`, x, 3));
          player2Slots.push(createCardSlot(`P2_Magic_${i}`, x, 3 - rowOffset));
      }

      return scene;
  }
}


