const { remote } = require('electron');
const { speak } = require('../../speaking');

global.status = {
  speaking: false,
};

jest.mock('electron', () => ({
  remote: {
    getGlobal: jest.fn(() => global.status),
  },
}));

describe('speak', () => {
  const listeners = {};

  beforeAll(() => {
    const speechSynthesisUtteranceMock = jest.fn().mockImplementation(msg => ({
      diction: msg,
      addEventListener: jest.fn((event, callback) => {
        listeners[event] = callback;
      }),
    }));
    global.SpeechSynthesisUtterance = speechSynthesisUtteranceMock;
  });

  it('should call native speak method with the given utterance', () => {
    const speakMock = jest.fn();
    window.speechSynthesis = {
      speak: speakMock,
    };

    speak('random tweet');

    expect(speakMock).toHaveBeenCalledWith({
      diction: 'random tweet',
      addEventListener: expect.any(Function),
    });
  });

  it('should set global status to the value of text when it starts speaking', () => {
    speak('random tweet');

    const event = {
      utterance: { text: 'random tweet' },
    };

    listeners.start(event);

    expect(remote.getGlobal).toHaveBeenCalledWith('status');
    expect(remote.getGlobal('status').speaking).toEqual('random tweet');
  });

  it('should set global status to false when it stops speaking', () => {
    speak('random tweet');

    const event = {
      utterance: { text: 'random tweet' },
    };

    listeners.end(event);

    expect(remote.getGlobal).toHaveBeenCalledWith('status');
    expect(remote.getGlobal('status').speaking).toBeFalsy();
  });
});
