export interface AuthTokens {
    access: string
    refresh: string
}

export interface TokenUser {
    user_id: number
}

export interface User {
    id: number
    username: string
    avatar: string | null
    generated_avatar: {
        first_color: string
        second_color: string
    }
    first_name: string
    last_name: string
    email: string
    description: string
    timezone: string
    links: string[]
    date_joined: string
    is_demo: boolean
}

export interface Member {
    id: number
    is_owner: boolean
    is_admin: boolean
    status: string | null
    user: User
}

export interface Team {
    id: number
    slug: string
    title: string
    image: string | null
    description: string
    is_admin: boolean
    is_owner: boolean
    is_member: boolean
    members: Member[]
    member_id: number
    member_status: string
}

export interface TeamStats {
    total: number
    to_do: number
    in_progress: number
    need_review: number
    done: number
    assigned: number
}

export interface Invitee extends User {
    is_invited: boolean
    is_member: boolean
}

export interface TeamInvitesData {
    invited_people: Invitee[]
    join_key_common: string
    join_key_selective: string
}

export interface PaginatedResponse<T> {
    count: number
    next: string | null
    previous: string | null
    current_page: number
    results: T[]
}

export type OrderingKey = 'id' | '-id' | string

export interface SearchParams {
    search?: string | null
    email?: string | null
    ordering?: OrderingKey
    page_size?: number
    page?: number
}

export interface Tag {
    id: number
    team: number
    title: string
    color: string
}

export interface Step {
    id: number
    title: string
    is_done: boolean
}

export interface Comment {
    id: number
    text: string
    task: number
    user: User
}

export interface Task {
    id: number
    title: string
    description: string
    steps: Step[]
    deadline: string | null
    messages_count: number
    attachments: File[]
    assignee: Member
    tag: Tag | null
    status: 'to_do' | 'in_progress' | 'need_review' | 'done'
    requires_review: boolean
}

export type ValidationErrors = Record<string, string[]>

export type MenuPosition = 'left' | 'right'

export interface MenuAction {
    title: string
    icon: React.ReactNode
    action(): void
    color?: string
    disabled?: boolean
}

export interface ColumnType {
    status: string
    canAdd: boolean
}

export interface SortingOption {
    title: string
    icon: React.ReactNode
}
