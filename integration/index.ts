export interface F1PacketHeader {
  m_packetId: number
  m_frameIdentifier: number
}

export interface F1Session {
  m_sessionType: number
  m_trackId: number
}

export interface F1Participants {
  m_header: F1PacketHeader
  m_numActiveCars: number
  m_participants: F1Participant[]
}

export interface F1Participant {
  m_aiControlled: number
  m_driverId: number // always 255 in multiplayer mode
  m_networkId: number
  m_teamId: number
  m_raceNumber: number
  m_nationality: number
  m_name: string
}

export enum F1EventType {
  SSTA = 'SSTA',
  SEND = 'SEND',
  FTLP = 'FTLP',
  RTMT = 'RTMT',
  DRSE = 'DRSE',
}

export interface F1Event {
  m_eventStringCode: F1EventType
  m_eventDetails: F1FastestLap
}

export interface F1FastestLap {
  vehicleIdx: number // Vehicle index of car achieving fastest lap
  lapTime: number // Lap time is in seconds
}

export interface F1LapDataPacket {
  m_header: F1PacketHeader
  m_lapData: F1LapData[]
}

export interface F1LapData {
  m_lastLapTimeInMS: number
  m_currentLapTimeInMS: number
  m_sector1TimeInMS: number
  m_sector2TimeInMS: number
  m_currentLapNum: number
  m_numPitStops: number
  m_currentLapInvalid: number
  m_penalties: number
  m_driverStatus: number
  m_resultStatus: number
  m_carPosition: number
  m_lapDistance: number
}

export interface F1CarStatusPacket {
  m_carStatusData: F1CarStatusData[]
}

export interface F1CarStatusData {
  m_visualTyreCompound: number
}

export interface F1TelemetryPacket {
  m_header: F1PacketHeader
  m_carTelemetryData: F1TelemetryData[]
}

export interface F1TelemetryData {
  m_speed: number
  m_throttle: number
  m_steer: number
  m_brake: number
  m_gear: number
  m_drs: number
}
