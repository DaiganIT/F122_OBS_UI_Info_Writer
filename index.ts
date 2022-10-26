import fs from 'fs'
import { F1TelemetryClient, constants } from '@racehub-io/f1-telemetry-client'
const { PACKETS } = constants
import OBSWebSocket from 'obs-websocket-js'
const obs = new OBSWebSocket()

import { F1Event, F1EventType, F1FastestLap } from './integration'

type ParticipantInfo = {
  name: string
}

type ParticipantMap = {
  [carIndex: number]: ParticipantInfo
}

const participants: ParticipantMap = {}

const writeNewFastestLap = (fastestLap: F1FastestLap) => {
  // write driver name in driver name file
  // write lap time in lap time file
  console.log('Received new fastest lap')

  if (fastestLap.vehicleIdx >= 0) {
    const participant = participants[fastestLap.vehicleIdx]
    if (!participant) {
      console.log(
        `WARN: Fastest lap for index not found - ${fastestLap.vehicleIdx}`
      )
      return
    }

    fs.writeFileSync('./outputs/fastestlap/name.out', participant.name)
    fs.writeFileSync(
      './outputs/fastestlap/laptime.out',
      fastestLap.lapTime.toString()
    )

    setTimeout(() => {
      obs.call('SetSceneItemEnabled', {
        sceneName: 'Game Test',
        sceneItemId: 2,
        sceneItemEnabled: true,
      })
    }, 2000)

    setTimeout(() => {
      obs.call('SetSceneItemEnabled', {
        sceneName: 'Game Test',
        sceneItemId: 2,
        sceneItemEnabled: false,
      })
    }, 7000)
  } else {
    fs.writeFileSync('./outputs/fastestlap/name.out', '')
    fs.writeFileSync('./outputs/fastestlap/laptime.out', '0')
  }
}

const handleEvent = (f1event: F1Event) => {
  if (f1event.m_eventStringCode === F1EventType.FTLP) {
    writeNewFastestLap(f1event.m_eventDetails)
  }
}

const client = new F1TelemetryClient({ port: 20777 })
client.on(PACKETS.event, handleEvent)
// client.on(PACKETS.motion, console.log)
// client.on(PACKETS.carSetups, console.log)
// client.on(PACKETS.lapData, handleLapData)
// client.on(PACKETS.session, handleSession)
// client.on(PACKETS.participants, handleParticipants)
// client.on(PACKETS.carTelemetry, handleTelemetry)
// client.on(PACKETS.carStatus, handleCarStatus)
// client.on(PACKETS.finalClassification, console.log)
// client.on(PACKETS.lobbyInfo, console.log)
// client.on(PACKETS.carDamage, console.log)
// client.on(PACKETS.sessionHistory, console.log)

// create all files
writeNewFastestLap({
  vehicleIdx: -1,
  lapTime: 0,
})

const start = async () => {
  // client.start()
  await obs.connect('ws://127.0.0.1:4444', 'pietro')
}

start()

// test fastest lap
participants[1] = { name: 'Daigan' }
setTimeout(() => {
  handleEvent({
    m_eventStringCode: F1EventType.FTLP,
    m_eventDetails: { lapTime: 100, vehicleIdx: 1 },
  })
}, 5000)
