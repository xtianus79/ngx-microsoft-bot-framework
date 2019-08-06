export interface IPayload {
  secret: string;
  secretSetting: boolean;
  url?: string;
  userId?: string;
  webSocket?: boolean;
}