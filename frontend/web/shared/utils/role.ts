import { LinkProps } from '../types'

export type UserRole = '普通用户' | '放射源管理员' | '用户管理员';

export const roles: UserRole[] = ['普通用户', '放射源管理员', '用户管理员']

export function get(): UserRole {
  return roles[0]
}
export interface sidebarLinkProps extends LinkProps {
  icon: string;
}
export function getSidebarLinksByRole(): sidebarLinkProps[] {
  const userRole = get()
  const linkMap = {
    普通用户: [
      { url: '/source/search', name: '查询', icon: 'fas fa-search' },
      { url: '/source/application', name: '申请', icon: 'fas fa-file-alt' },
      { url: '/source/monitor', name: '监控', icon: 'far fa-chart-bar' },
      { url: '/user/history/', name: '个人记录', icon: 'fas fa-history' }
    ],
    放射源管理员: [
      { url: '/source/search', name: '查询', icon: 'fas fa-search' },
      { url: '/manage/application', name: '处理申请', icon: 'fas fa-tasks' },
      { url: '/manage/history', name: '管理日志', icon: 'fas fa-history' },
      { url: '/manage/source', name: '登记/注销放射源', icon: 'fas fa-pen-nib' }
    ],
    用户管理员: [
      { url: '/user/search', name: '查询用户', icon: 'far fa-address-book' }
    ]
  }
  return linkMap[userRole]
}

export default {
  get,
  getSidebarLinksByRole
}
