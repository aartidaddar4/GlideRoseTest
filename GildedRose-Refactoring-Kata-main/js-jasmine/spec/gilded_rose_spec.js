var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  
    // This Conjured item does not work properly yet
    new Item("Conjured Mana Cake", 3, 6),
  ];


  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it('should decrease quality and ', () => {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    // after 1 day
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(19);
    expect(res.sellIn).toEqual(9);
  });

  it('quality of Aged Brie should increase', () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(1);
    expect(res.sellIn).toEqual(1);
  });

  it('once the sell date has passed quality degrades twice as fast', () => {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 7)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(5);
    expect(res.sellIn).toEqual(-1);
  });

  it('The Quality of an item is never negative', () => {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 2, 0)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(0);
    expect(res.sellIn).toEqual(1);
  });

  it('The Quality of an item is never more than 50', () => {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(50);
    expect(res.sellIn).toEqual(1);
  });

  it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 2, 80)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(80);
    expect(res.sellIn).toEqual(2);
  });

  it('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(21);
    expect(res.sellIn).toEqual(14);
  });

  it('For "Backstage passes", Quality increases by 2 when there are 10 days or less', () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(22);
    expect(res.sellIn).toEqual(9);
  });

  it('For "Backstage passes", Quality increases by and by 3 when there are 5 days or less', () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(23);
    expect(res.sellIn).toEqual(4);
  });

  it('For "Backstage passes", Quality drops to 0 after the concert', () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    const res = gildedRose.updateQuality()[0];
    expect(res.quality).toEqual(0);
    expect(res.sellIn).toEqual(-1);
  });

  it('"Conjured" items degrade in Quality twice as fast as normal items', () => {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    const res = gildedRose.newUpdateQuality()[0];
    expect(res.quality).toEqual(4);
    expect(res.sellIn).toEqual(2);
  });









});
