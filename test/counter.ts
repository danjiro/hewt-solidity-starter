import { ethers } from 'hardhat';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { solidity } from 'ethereum-waffle';
import { Counter } from '../typechain/Counter';

chai.use(solidity);
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Counter', () => {
  let counter: Counter;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    const counterFactory = await ethers.getContractFactory('Counter', signers[0]);

    counter = (await counterFactory.deploy()) as Counter;
    await counter.deployed();

    const initialCount = await counter.getCount();

    expect(initialCount).to.eq(0);
    expect(counter.address).to.properAddress;
  });

  describe('countUp', async () => {
    it('should count up', async () => {
      await counter.countUp();
      const count = await counter.getCount();
      expect(count).to.eq(1);
    });
  });

  describe('countDown', async () => {
    it('should cause subtraction overflow', async () => {
      return expect(counter.countDown()).to.eventually.be.rejectedWith(Error, 'SafeMath: subtraction overflow');
    });

    it('should count down', async () => {
      await counter.countUp();
      await counter.countDown();
      expect(await counter.getCount()).to.eq(0);
    });
  });
});
