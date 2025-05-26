export class SmartSound {
    private audio: HTMLAudioElement;
    public muted: boolean;
  
    constructor(src: string) {
      this.audio = new Audio(src);
      this.muted = false;
    }
  
    play() {
      if (!this.muted) {
        // this.audio.currentTime = 0; //rewind before play
        this.audio.play().catch((e) => {
          console.warn(`Audio play failed: ${e}`);
        });
      }
    }
  
    setMuted(muted: boolean) {
      this.muted = muted;
    }
  }
  