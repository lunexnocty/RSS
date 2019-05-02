import { UserRole, LinkProps } from '../types'

export function get(): UserRole {
  return 'normal'
}

export function getSidebarLinksByRole() {
  const userRole = get()
  console.log(userRole)
  let links: LinkProps[] = []
  switch (userRole) {
  case 'normal':
    links = [
      { url: '/source/search', name: '查询' },
      { url: '/source/apply', name: '申请' },
      { url: '/source/monitor', name: '监控' },
      { url: '/user/history', name: '个人记录' }
    ]
    break
  case 'sourceAdmin':
    links = [
      { url: '/source/search', name: '查询' },
      { url: '/source/apply', name: '处理申请' },
      { url: '', name: '管理日志' },
      { url: '', name: '登记/注销放射源' }
    ]
    break
  case 'userAdmin':
    links = [{ url: '/user/search', name: '查询用户' }]
  }
  return links
}

export default {
  get,
  getSidebarLinksByRole
}
