const { speak } = require('./speaking');

describe('speak', () => {
  beforeAll(() => {
    const speechSynthesisUtteranceMock = jest.fn().mockImplementation((msg) => ({
      diction: msg,
    }));
    global.SpeechSynthesisUtterance = speechSynthesisUtteranceMock;
  });

  it('should call native speak method with the given utterance', () => {
    const speakMock = jest.fn();
    window.speechSynthesis = {
      speak: speakMock,
    }

    speak('random tweet');

    expect(speakMock).toBeCalledWith({ diction: 'random tweet' });
  });
});
