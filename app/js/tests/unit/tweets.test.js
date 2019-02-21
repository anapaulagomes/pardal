const { readTweets, resetCurrent } = require('../../tweets');
const { speak } = require('../../speaking');
const { format } = require('../../templates');

jest.mock('../../speaking');
jest.mock('../../templates');
jest.mock(
  '../fixtures/timeline.json',
  () => [{ full_text: 'first tweet' }, { full_text: 'second tweet' }],
  { virtual: true },
);

describe('readTweets, when timeline has 2 tweets', () => {
  const endOfTimelineMessage = 'End of the timeline.';

  beforeAll(() => {
    format.mockImplementation((_, content) => content.full_text);
  });

  beforeEach(() => {
    resetCurrent();
    speak.mockClear();
  });

  describe('when called once', () => {
    describe('with direction down', () => {
      it('calls speak method with the first formatted tweet', () => {
        readTweets('down');

        expect(speak).toHaveBeenCalledTimes(1);
        expect(speak).toHaveBeenNthCalledWith(1, 'first tweet');
      });
    });

    describe('with direction up', () => {
      it('calls speak method with the message End of the timeline', () => {
        readTweets('up');

        expect(speak).toHaveBeenCalledTimes(1);
        expect(speak).toHaveBeenNthCalledWith(1, endOfTimelineMessage);
      });
    });
  });

  describe('when called twice', () => {
    describe('with direction down and down', () => {
      it('calls speak method with the second formatted tweet', () => {
        readTweets('down');
        readTweets('down');

        expect(speak).toHaveBeenCalledTimes(2);
        expect(speak).toHaveBeenNthCalledWith(2, 'second tweet');
      });
    });

    describe('with direction down and up', () => {
      it('calls speak method with the message End of the timeline', () => {
        readTweets('down');
        readTweets('up');

        expect(speak).toHaveBeenCalledTimes(2);
        expect(speak).toHaveBeenNthCalledWith(2, endOfTimelineMessage);
      });
    });

    describe('with direction up and down', () => {
      it('calls speak method with the first formatted tweet', () => {
        readTweets('up');
        readTweets('down');

        expect(speak).toHaveBeenCalledTimes(2);
        expect(speak).toHaveBeenNthCalledWith(2, 'first tweet');
      });
    });

    describe('with direction up and up', () => {
      it('calls speak method with the message End of the timeline', () => {
        readTweets('up');
        readTweets('up');

        expect(speak).toHaveBeenCalledTimes(2);
        expect(speak).toHaveBeenNthCalledWith(2, endOfTimelineMessage);
      });
    });
  });

  describe('when called three times', () => {
    describe('with direction down, down and down', () => {
      it('calls speak method with the message End of the timeline', () => {
        readTweets('down');
        readTweets('down');
        readTweets('down');

        expect(speak).toHaveBeenNthCalledWith(3, endOfTimelineMessage);
      });
    });

    describe('with direction down, down and up', () => {
      it('calls speak method with the first formatted tweet', () => {
        readTweets('down');
        readTweets('down');
        readTweets('up');

        expect(speak).toHaveBeenNthCalledWith(3, 'first tweet');
      });
    });

    describe('with direction down, up and down', () => {
      it('calls speak method with the first formatted tweet', () => {
        readTweets('down');
        readTweets('up');
        readTweets('down');

        expect(speak).toHaveBeenNthCalledWith(3, 'first tweet');
      });
    });

    describe('with direction down, up and up', () => {
      it('calls speak method with the message End of the timeline', () => {
        readTweets('down');
        readTweets('up');
        readTweets('up');

        expect(speak).toHaveBeenNthCalledWith(3, endOfTimelineMessage);
      });
    });

    describe('with direction up, down and down', () => {
      it('calls speak method with the second formatted tweet', () => {
        readTweets('up');
        readTweets('down');
        readTweets('down');

        expect(speak).toHaveBeenNthCalledWith(3, 'second tweet');
      });
    });

    describe('with direction up, down and up', () => {
      it('calls speak method with the message End of the timeline', () => {
        readTweets('up');
        readTweets('down');
        readTweets('up');

        expect(speak).toHaveBeenNthCalledWith(3, endOfTimelineMessage);
      });
    });

    describe('with direction up, up and down', () => {
      it('calls speak method with the first formatted tweet', () => {
        readTweets('up');
        readTweets('up');
        readTweets('down');

        expect(speak).toHaveBeenNthCalledWith(3, 'first tweet');
      });
    });

    describe('with direction up, up and up', () => {
      it('calls speak method with the message End of the timeline', () => {
        readTweets('up');
        readTweets('up');
        readTweets('up');

        expect(speak).toHaveBeenNthCalledWith(3, endOfTimelineMessage);
      });
    });
  });
});
