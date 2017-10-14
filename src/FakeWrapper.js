const EventEmitter = require('events')

const STATE_CHANGED = "stateChanged"

class FakeWrapper extends EventEmitter {


    constructor()
    {
        super()
        this.data = []
        this.interval = {}
        this.startInterval()
        this.STATE_CHANGED = "stateChanged"
    }

    startInterval()
    {
        this.interval=setInterval(() => {
            for (let i=0; i<4; i += 1) {
                this.data[i] = Math.floor(Math.random() * 10);
            }

            this.emit(STATE_CHANGED)

        }, 500)
    }

    getData()
    {
        return this.data
    }
  
}

export default new FakeWrapper()
