import { defineStore } from "pinia";

export const useGameboardStore = defineStore("gameboard", {
  state: () => ({
    rows: 6, 
    cols: 5, 
    board: [] as Array<Array<{ id: string; card: string | null; owner: string | null }>>, 
    towers: [] as Array<{ x: number; y: number }>, 
    placedCards: [] as Array<{ x: number; y: number; cardId: string; owner: string }>, 
    players: [] as Array<{ id: string; name: string; deck: string[] }>, 
    currentPlayerIndex: 0, 
    partyId: "", 
    status: "waiting", // waiting, playing, finished
  }),

  actions: {
    initializeBoard(partyId: string, players: Array<{ id: string; name: string; deck: string[] }>) {
      this.partyId = partyId;
      this.players = players;
      this.currentPlayerIndex = 0;
      this.status = "playing";

      this.board = Array.from({ length: this.rows }, (_, y) =>
        Array.from({ length: this.cols }, (_, x) => ({
          id: `${x}-${y}`,
          card: null,
          owner: null,
        }))
      );

      // Définition des tours aux coins et au centre haut/bas
      this.towers = [
        { x: 0, y: 0 }, { x: 4, y: 0 }, // Haut-gauche, Haut-droit
        { x: 0, y: 5 }, { x: 4, y: 5 }, // Bas-gauche, Bas-droit
        { x: 2, y: 0 }, { x: 2, y: 5 }  // Milieu haut, Milieu bas
      ];
    },

    placeCard(x: number, y: number, cardId: string) {
      const currentPlayer = this.players[this.currentPlayerIndex];

      if (!this.board[y][x].card) {
        this.board[y][x].card = cardId;
        this.board[y][x].owner = currentPlayer.id;
        this.placedCards.push({ x, y, cardId, owner: currentPlayer.id });

        // Passer au joueur suivant
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      }
    },

    checkWinCondition() {
      if (this.placedCards.length >= this.rows * this.cols) {
        this.status = "finished";
        return true;
      }
      return false;
    },

    resetBoard() {
      this.partyId = "";
      this.players = [];
      this.placedCards = [];
      this.status = "waiting";
      this.initializeBoard("", []);
    },
  },
});
