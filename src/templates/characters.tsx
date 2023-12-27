const templateCharacters = [
  {
    data: {
      id: 1,
      name: "Scorpion",
      health: 39,
      attack: 52,
      defense: 43,
      speed: 30,
      moves: [
        {
          name: "melee",
          level: 1,
        },
        {
          name: "jump",
          level: 1,
        },
      ],
      sprite: {
        state: "idle",
        idle: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
          flip: false,
        },
        attack: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
          flip: false,
        },

        hit: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
          flip: false,
        },
        death: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/de0t018-77e46de6-cf20-4295-8a38-a1622963c9a0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZGUwdDAxOC03N2U0NmRlNi1jZjIwLTQyOTUtOGEzOC1hMTYyMjk2M2M5YTAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Og9CqG-t0VEeu8RJiMDADNa45pfA3rEzCuq0leSodpQ",
          flip: false,
        },
      },
    },
  },
  {
    data: {
      id: 2,
      name: "Subzero",
      health: 44,
      attack: 48,
      defense: 65,
      speed: 43,
      moves: [
        {
          name: "melee",
          level: 1,
        },
      ],
      sprite: {
        state: "idle",
        idle: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
          flip: true,
        },
        attack: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
          flip: false,
        },
        hit: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
          flip: false,
        },
        death: {
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2a633598-5ed3-4ec1-b0f1-2231281343bf/d9o65e7-395aabda-8f13-44ff-9cad-31676da7e9c8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJhNjMzNTk4LTVlZDMtNGVjMS1iMGYxLTIyMzEyODEzNDNiZlwvZDlvNjVlNy0zOTVhYWJkYS04ZjEzLTQ0ZmYtOWNhZC0zMTY3NmRhN2U5YzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qvpBLdc1n1SYs0SVAQjSRW5kNfgd538fThIE3gEbOLQ",
          flip: false,
        },
      },
    },
  },
];

export default templateCharacters;
