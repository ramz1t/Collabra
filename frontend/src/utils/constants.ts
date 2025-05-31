import { ColumnType } from '../types'

export const STATUSES = ['to_do', 'in_progress', 'need_review', 'done']
export const DEFAULT_PAGE_SIZE = 15

export const UserRole = {
    MEMBER: 'member',
    ADMIN: 'admin',
    OWNER: 'owner',
}

export const StorageKey = {
    AUTH_TOKENS: 'authTokens',
    CARD_STYLE: 'cardStyle',
    COOKIES_ACCEPTED: 'cookiesAccepted',
    COOKIES_SETTINGS_SAVED: 'cookiesSettingsSaved',
    DIALOG_FULLSCREEN: 'dialogFullScreen',
    DISPLAY_TEAMS_IN_LIST: 'displayTeamsInList',
    THEME_SETTING: 'themeSetting',
    TASKS_VIEW_OPTION: 'tasksViewOption',
    TASKBOARD_COLS_POSITION: 'taskboardColsPosition',
    ORDER_BY: (
        key:
            | 'done'
            | 'in_progress'
            | 'need_review'
            | 'to_do'
            | 'tasksList'
            | 'teams'
    ) => `${key}_orderBy`,
}

export const TASKBOARD_INIT_COLS: ColumnType[] = [
    { status: 'to_do', canAdd: true },
    { status: 'in_progress', canAdd: true },
    { status: 'need_review', canAdd: false },
    { status: 'done', canAdd: false },
]
