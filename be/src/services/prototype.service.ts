type MarkerType = 'diary' | 'wishlist' | 'shared'

type MapMarker = {
  id: string
  type: MarkerType
  title: string
  description: string
  position: { top: string; left: string }
}

export type HomeSummary = {
  markers: MapMarker[]
  diaryCount: number
  wishlistCount: number
  roomId: string
}

export type DiaryDraft = {
  date: string
  placeName: string
  content: string
  memo: string
}

export type PlaceDraft = {
  name: string
  category: string
}

export type RoomDraft = {
  name: string
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

const places: Place[] = [
  { id: 'place-seongsu', name: '성수 작은 식당', category: '맛집', status: '이번 주 후보' },
  { id: 'place-jamsil', name: '잠실 야경길', category: '산책', status: '저장됨' },
  { id: 'place-bukchon', name: '북촌 골목 산책', category: '여행지', status: '같이 저장' },
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

const homeSummary: HomeSummary = {
  markers: [
    { id: 'mangwon', type: 'diary', title: '망원 한강공원', description: '노을을 보며 남긴 산책 기록', position: { top: '38%', left: '26%' } },
    { id: 'seongsu', type: 'wishlist', title: '성수 작은 식당', description: '이번 주말에 같이 가보기', position: { top: '28%', left: '62%' } },
    { id: 'bukchon', type: 'shared', title: '북촌 골목', description: '함께 저장한 다음 데이트 장소', position: { top: '58%', left: '48%' } },
    { id: 'yeonnam', type: 'diary', title: '연남동 카페', description: '처음 같이 간 장소 일기', position: { top: '68%', left: '21%' } },
    { id: 'jamsil', type: 'wishlist', title: '잠실 야경길', description: '비 오는 날 말고 맑은 날 가기', position: { top: '48%', left: '76%' } },
  ],
  diaryCount: 3,
  wishlistCount: 12,
  roomId: 'room-ilgi-204',
}

const diaryDraft: DiaryDraft = {
  date: '2026-06-11',
  placeName: '망원 한강공원',
  content: '노을이 천천히 내려오고, 같이 걷던 길이 조용해서 좋았다.',
  memo: '다음에는 돗자리랑 따뜻한 차를 챙겨가기.',
}

const placeDraft: PlaceDraft = {
  name: '서촌 작은 책방',
  category: '데이트',
}

const roomDraft: RoomDraft = {
  name: '우리의 주말 지도',
}

export function getHomeSummary() {
  return homeSummary
}

export function getDiaryDraft() {
  return diaryDraft
}

export function getPlaceDraft() {
  return placeDraft
}

export function getRoomDraft() {
  return roomDraft
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
