export enum Pages {
   HOME = '/',
   SERVICES = '/services',
   COMPANIES = '/companies',
   RESERVATIONS = '/account/reservations',
   PRIVACY = '/privacy',

   LOGIN = '/auth/login',
   REGISTER = '/auth/register',
   PASSWORD_RESET_REQUEST = '/auth/password-reset-request',
   PASSWORD_RESET_NEW_PASSWORD = '/auth/password-reset-new-password',
   EMAIL_VERIFICATION = '/auth/email-verification',
   LOGOUT = '/auth/logout',

   ADMIN_DASHBOARD = '/admin/dashboard',
   ADMIN_RESERVATIONS = '/admin/reservations',
   RESERVATIONS_EDIT = '/admin/reservations/edit',
   ADMIN_REVIEWS = '/admin/reviews',
   ADMIN_CLIENTS = '/admin/customers',
   ADMIN_COMPANIES = '/admin/companies',
   ADMIN_SETTINGS = '/admin/settings',
   ADMIN_PROFILES = '/admin/profiles',
   ADMIN_SERVICES = '/admin/services',
   ADMIN_SERVICES_NEW = '/admin/services/new',
   ADMIN_SERVICES_EDIT = '/admin/services/edit',
}

export enum Locale {
   fr = 'fr',
}

export const RESTRICT_FIELD_PLACEHOLDER = '********';

export const UPLOAD_PATH = './public/uploads';
export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export enum FileType {
   EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
   PDF = 'application/pdf',
   CSV = 'text/csv',
   JPEG = 'image/jpeg',
   PNG = 'image/png',
   WORD = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export enum HttpMethod {
   GET = 'GET',
   POST = 'POST',
   PUT = 'PUT',
   DELETE = 'DELETE',
   PATCH = 'PATCH',
   HEAD = 'HEAD',
   OPTIONS = 'OPTIONS',
}

export const appUrl = process.env.NEXT_PUBLIC_APP_URL;
export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const mercureUrl = process.env.NEXT_PUBLIC_MERCURE_URL;
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export enum ApiFormat {
   JSON = 'application/json',
   JSON_MERGE_PATCH = 'application/merge-patch+json',
   JSONLD = 'application/ld+json',
   GRAPHQL = 'application/graphql',
   JSONAPI = 'application/vnd.api+json',
   HAL = 'application/hal+json',
   YAML = 'application/x-yaml',
   CSV = 'text/csv',
   HTML = 'text/html',
   RAW_JSON = 'raw/json',
   RAW_XML = 'raw/xml',
}

export enum ApiRoutesWithoutPrefix {
   LOGS = '/logs',
   MEMBERS = '/membres',
   USERS = '/users',
   MODULE_TYPES = '/module_types',
   MODULE_HISTORIES = '/module_histories',
   MODULE_STATUSES = '/module_statuses',
   STATISTICS = '/statistics',
   COMMANDS = '/commands',
   LOGIN = '/login',
   VERIFY_RESEND = '/verifies/resend',
   FORGET_PASSWORD = '/forget_passwords',
   LOGOUT = '/logout',
   SUBSCRIPTION_TYPES = '/subscription_types',
   RESERVATION_STATUSES = '/reservation_statuses',
   SERVICES = '/services',
   REVIEWS = '/reviews',
   COMPANIES = '/companies',
   RESERVATIONS = '/reservations',
   COMPANY_USERS = '/company_users',
}

type BaseApiFilters = 'search' | 'page';

export type ModulesApiFilters = BaseApiFilters | 'name' | 'description' | 'createdAt';

export type ModuleTypesApiFilters =
   | BaseApiFilters
   | 'name'
   | 'unitOfMeasure'
   | 'minValue'
   | 'maxValue';

export type ModuleStatusApiFilters = BaseApiFilters | 'name' | 'slug';

export type ApiFiltersType =
   | ModulesApiFilters
   | ModuleTypesApiFilters
   | ModuleStatusApiFilters;

export enum StatisticEnum {
   USER,
   MODULE,
   MODULE_TYPE,
   MODULE_HISTORY,
   MODULE_STATUS,
}

export enum DATE_FORMAT {
   LT = 'LT',
   LTS = 'LTS',
   DATE = 'LL',
   DATETIME = 'LLLL',
}

export enum MERCURE_NOTIFICATION_TYPE {
   NEW = 'NEW',
   UPDATE = 'UPDATE',
   DELETE = 'DELETE',
}

export const APP_NAME = 'IoTAdmin';

export enum LoginAccess {
   EMAIL = 'admin@otp.picassohouessou.com',
   PASSWORD = 'admin',
}

export enum AppCookies {
   ACCESS_TOKEN = '_acs_tkn',
   REFRESH_TOKEN = '_rfrsh_tkn',
}

export const PAGE_PREFIX_USERS = '/users';

export enum LocalStorageKeys {
   LAST_KNOWN_LOCATION = '2lk',
   TASK_FILTER = 'sd_task_filters',
   MENU_STATE = 'menu_state',
   ZOOM_LEVEL = 'zoom_level',
   ZOOM_STEP = 'zoom_step',
   ZOOM_WIDTH = 'zoom_width',
   ROUTES_PREVIOUS_LISTING_PAGE = 'routes_previous_listing_page',
}

export enum ReservationStatus {
   NEW = 'new',
   PLANNED = 'planned',
   CONFIRMED = 'confirmed',
   SENT = 'sent',
   COMPLETED = 'completed',
   DRAFT = 'draft',
   CANCELED = 'canceled',
   ACKNOWLEDGED = 'acknowledged',
}
export const AVATAR_DEFAULT = '/assets/img/avatar.jpg';
export const IMAGE_DEFAULT = '/assets/img/avatar.jpg';

export enum CompanyRoles {
   ROLE_ADMIN = 'ROLE_ADMIN',
   ROLE_USER = 'ROLE_USER',
}
