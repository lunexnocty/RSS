import { LinkProps } from "../types";
import auth from "./auth";
export type UserRole = "普通用户" | "RST管理员" | "用户管理员";
type RoleMap = {
  [n: number]: UserRole;
};

export const roleMap: RoleMap = {
  3: "普通用户",
  4: "RST管理员",
  2: "用户管理员"
};

export interface sidebarLinkProps extends LinkProps {
  icon: string;
}
type SidebarMap = {
  [s: string]: sidebarLinkProps[];
};

export const sidebarMap: SidebarMap = {
  普通用户: [
    { url: "/", name: "查询", icon: "fas fa-search" },
    { url: "/source/application", name: "申请", icon: "fas fa-file-alt" },
    { url: "/source/monitor", name: "监控", icon: "far fa-chart-bar" },
    { url: "/user/history/", name: "个人记录", icon: "fas fa-history" }
  ],
  RST管理员: [
    { url: "/", name: "查询", icon: "fas fa-search" },
    { url: "/manage/application", name: "处理申请", icon: "fas fa-tasks" },
    { url: "/manage/history", name: "管理日志", icon: "fas fa-history" },
    { url: "/manage/source", name: "登记/注销放射源", icon: "fas fa-pen-nib" }
  ],
  用户管理员: [
    { url: "/user/search", name: "查询用户", icon: "far fa-address-book" }
  ]
};

export default {
  sidebarMap
};
