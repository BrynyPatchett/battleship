import Gameboard from "../gameboard";

describe("board initalisation", () => {
  test("board grid is initalised to grid of n*n", () => {
    let n = 10;
    let gameboard = new Gameboard(n);
    expect(gameboard.grid.length).toEqual(n);
    expect(gameboard.grid[0].length).toEqual(n);
  });
});

describe("Ships belong to board", () => {
  test("Adding a ship to the board updates the list of ships the board has", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    expect(gameboard.ships[0]).toEqual({ length: 2, hits: 0 });
  });

  test("Adding a multiple ships to same poisition the board does not update gameboard ship list", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    expect(gameboard.AddShipToGrid(shiplength, coords, 0)).toBe(false);
    expect(gameboard.ships[0]).toEqual({ length: 2, hits: 0 });
  });
  test("Adding a multiple ships to the board updates the list of ships the board has", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    coords = { x: 1, y: 1 };
    expect(gameboard.AddShipToGrid(shiplength, coords, 0)).toBe(true);
    expect(gameboard.ships[0]).toEqual({ length: 2, hits: 0 });
    expect(gameboard.ships[1]).toEqual({ length: 2, hits: 0 });
  });

  test("Adding a ship to the board with invalid coords does not add a ship (less than grid size)", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: -1, y: -1 };
    let shiplength = 2;
    expect(gameboard.AddShipToGrid(shiplength, coords, 0)).toBe(false);
    expect(gameboard.ships).toEqual([]);
  });
  test("Adding a ship to the board with invalid coords does not add a ship (greater than grid size)", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 10, y: 10 };
    let shiplength = 2;
    expect(gameboard.AddShipToGrid(shiplength, coords, 0)).toBe(false);
    expect(gameboard.ships).toEqual([]);
  });
});

describe("Ships placement", () => {
  test("board places single ship in grid horizontal", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };
    let shiplength = 2;
    expect(gameboard.AddShipToGrid(shiplength, coords, 0)).toBe(true);
    expect(gameboard.grid[0]).toEqual([1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test("board multiple ships at same position in grid horizontal does not update grid", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };
    let shiplength = 2;
    expect(gameboard.AddShipToGrid(shiplength, coords, 0)).toBe(true);
    expect(gameboard.AddShipToGrid(shiplength, coords, 0)).toBe(false);
    expect(gameboard.grid[0]).toEqual([1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test("board places single ship in grid vertical", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 1);
    expect(gameboard.grid[0]).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(gameboard.grid[1]).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test("board places single ship in grid horizontal random place on board", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 3, y: 2 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    expect(gameboard.grid[2]).toEqual([0, 0, 0, 1, 1, 0, 0, 0, 0, 0]);
  });

  test("board places single ship in grid vertical random place on board", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 2, y: 4 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 1);
    expect(gameboard.grid[4]).toEqual([0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
    expect(gameboard.grid[5]).toEqual([0, 0, 1, 0, 0, 0, 0, 0, 0, 0]);
  });

  test("board places single ship in grid horizontal random place on board", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 3, y: 2 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    expect(gameboard.grid[2]).toEqual([0, 0, 0, 1, 1, 0, 0, 0, 0, 0]);
  });

  test("board places multiple ships in grid horizontal random place on board", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 2, y: 4 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    coords = { x: 6, y: 4 };
    gameboard.AddShipToGrid(shiplength, coords, 0);
    expect(gameboard.grid[4]).toEqual([0, 0, 1, 1, 0, 0, 2, 2, 0, 0]);
  });

  test("board places multiple ships in grid vertical random place on board", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 2, y: 4 };
    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 1);
    coords = { x: 6, y: 4 };
    gameboard.AddShipToGrid(shiplength, coords, 1);
    expect(gameboard.grid[4]).toEqual([0, 0, 1, 0, 0, 0, 2, 0, 0, 0]);
    expect(gameboard.grid[5]).toEqual([0, 0, 1, 0, 0, 0, 2, 0, 0, 0]);
  });

  test("Gameboard with roster of 5 ships is valid", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };

    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);

    shiplength = 3;
    coords = { x: 6, y: 4 };
    gameboard.AddShipToGrid(shiplength, coords, 1);

    shiplength = 3;
    coords = { x: 6, y: 7 };
    gameboard.AddShipToGrid(shiplength, coords, 1);

    shiplength = 4;
    coords = { x: 0, y: 3 };
    gameboard.AddShipToGrid(shiplength, coords, 0);

    shiplength = 5;
    coords = { x: 0, y: 9 };
    gameboard.AddShipToGrid(shiplength, coords, 0);

    expect(gameboard.grid[0]).toEqual([1, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(gameboard.grid[1]).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(gameboard.grid[2]).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(gameboard.grid[3]).toEqual([4, 4, 4, 4, 0, 0, 0, 0, 0, 0]);
    expect(gameboard.grid[4]).toEqual([0, 0, 0, 0, 0, 0, 2, 0, 0, 0]);
    expect(gameboard.grid[5]).toEqual([0, 0, 0, 0, 0, 0, 2, 0, 0, 0]);
    expect(gameboard.grid[6]).toEqual([0, 0, 0, 0, 0, 0, 2, 0, 0, 0]);
    expect(gameboard.grid[7]).toEqual([0, 0, 0, 0, 0, 0, 3, 0, 0, 0]);
    expect(gameboard.grid[8]).toEqual([0, 0, 0, 0, 0, 0, 3, 0, 0, 0]);
    expect(gameboard.grid[9]).toEqual([5, 5, 5, 5, 5, 0, 3, 0, 0, 0]);
  });
});

describe("Receieve attack and ships damaged", () => {
  test("attack miss", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };

    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    coords = { x: 2, y: 2 };
    expect(gameboard.ReceiveAttack(coords)).toBe(0);
    expect(expect(gameboard.grid[2]).toEqual([0, 0, -1, 0, 0, 0, 0, 0, 0, 0]));
  });

  test("attack single hit", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };

    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    expect(gameboard.ReceiveAttack(coords)).toBe(1);
    expect(expect(gameboard.grid[0]).toEqual([-1, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
    expect(gameboard.ships[0].hits).toEqual(1);
  });

  test("mutiple hit,sink and game loss with single ship", () => {
    let gameboard = new Gameboard(10);
    let coords = { x: 0, y: 0 };

    let shiplength = 2;
    gameboard.AddShipToGrid(shiplength, coords, 0);
    expect(gameboard.ReceiveAttack(coords)).toBe(1);
    expect(expect(gameboard.grid[0]).toEqual([-1, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
    expect(gameboard.ships[0].hits).toEqual(1);
     expect(gameboard.AllSunk()).toEqual(false);

     coords = { x: 1, y: 0 };
     expect(gameboard.ReceiveAttack(coords)).toBe(1);
    expect(expect(gameboard.grid[0]).toEqual([-1, -1, 0, 0, 0, 0, 0, 0, 0, 0]));
    expect(gameboard.ships[0].hits).toEqual(2);
    expect(gameboard.ships[0].isSunk()).toEqual(true);
    expect(gameboard.AllSunk()).toEqual(true);

  });

});
