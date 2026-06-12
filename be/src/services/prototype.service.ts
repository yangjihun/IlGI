type MarkerType = 'diary' | 'wishlist' | 'shared'

export type Diary = {
  id: string
  date: string
  placeName: string
  title: string
  memory: string
  memo: string
  author: string
  markerType: MarkerType
}

export type Place = {
  id: string
  name: string
  category: string
  status: string
}

export type Room = {
  id: string
  name: string
  inviteCode: string
  participants: string[]
  timeline: string[]
  places: Place[]
}

export type InvitationPreview = {
  roomId: string
  roomName: string
  inviteCode: string
  participantCount: number
}

const diaries: Diary[] = [
  {
    id: 'diary-mangwon',
    date: '2026-06-11',
    placeName: '망원 한강공원',
    title: '노을 보면서 남긴 산책 기록',
    memory: '강가를 따라 걷다가 하늘이 분홍색으로 바뀌는 걸 같이 봤다.',
    memo: '다음에는 야경 시간에 맞춰 다시 오기.',
    author: 'J',
    markerType: 'diary',
  },
]

const places: Place[] = [
  {
    id: 'place-seongsu',
    name: '성수 작은 식당',
    category: '맛집',
    status: '이번 주 후보',
  },
  {
    id: 'place-jamsil',
    name: '잠실 야경길',
    category: '산책',
    status: '저장됨',
  },
  {
    id: 'place-bukchon',
    name: '북촌 골목 산책',
    category: '여행지',
    status: '같이 저장',
  },
]

const rooms: Room[] = [
  {
    id: 'room-ilgi-204',
    name: '우리의 주말 지도',
    inviteCode: 'IlGI-204',
    participants: ['J', 'H'],
    timeline: ['망원 한강공원 기록 추가', '성수 작은 식당 후보 등록', '북촌 골목 산책을 같이 저장'],
    places,
  },
]

export function listDiaries() {
  return diaries
}

export function findDiaryById(id: string) {
  return diaries.find((diary) => diary.id === id)
}

export function listPlaces() {
  return places
}

export function findRoomById(id: string) {
  return rooms.find((room) => room.id === id)
}

export function findInvitationPreview(inviteCode: string): InvitationPreview | undefined {
  const room = rooms.find((candidate) => candidate.inviteCode.toLowerCase() === inviteCode.toLowerCase())

  if (!room) {
    return undefined
  }

  return {
    roomId: room.id,
    roomName: room.name,
    inviteCode: room.inviteCode,
    participantCount: room.participants.length,
  }
}
