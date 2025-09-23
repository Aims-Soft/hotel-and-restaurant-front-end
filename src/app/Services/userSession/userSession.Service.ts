import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  private readonly USER_KEY = 'currentUser';
  private readonly MENUS_KEY = 'currentMenus';
  private readonly TOKEN_KEY = 'authToken';

  constructor() {}

  saveUserSession(userData: any): void {
    if (userData?.token) {
      localStorage.setItem(this.TOKEN_KEY, userData.token);
    }

    const userToStore = {
      userLoginId: userData.userLoginId,
      roleId: userData.roleId,
      roleJson: userData.roleJson,
      fullName: userData.fullName,
      loginName: userData.loginName,
      roleTitle: userData.roleTitle,
      companyID:userData.companyID,
      pin:userData.pin,

    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(userToStore));
  }

  saveMenuSession(menuData: any): void {
    // const menuToStore = {
    //   roleId: menuData.roleId,
    //   roleTitle: menuData.roleTitle,
    //   menuId: menuData.menuId,
    //   parentMenuId: menuData.parentMenuId,
    //   menuTitle: menuData.menuTitle,
    //   menuIcon: menuData.menuIcon,
    //   parentRoute: menuData.parentRoute,
    //   routeTitle: menuData.routeTitle,
    //   read: menuData.read,
    //   write: menuData.write,
    //   delete: menuData.delete,
    // };

    localStorage.setItem(this.MENUS_KEY, JSON.stringify(menuData));
  }

  getMenus(): any[] {
  const menus = localStorage.getItem(this.MENUS_KEY);
  return menus ? JSON.parse(menus) : [];
}

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  getUserID(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user).userLoginId : null;
  }

   getpin(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user).pin : null;
  }
  getCompanyID(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user). companyID: null;
  }


  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getRoleId(): number | null {
    const user = this.getUser();
    return user?.roleId || null;
  }

  getRoleTitle(): string | null {
    const user = this.getUser();
    return user?.roleTitle || null;
  }

  clearSession(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasRole(roleId: number): boolean {
    const user = this.getUser();
    if (!user || !user.roleJson) return false;

    try {
      const roles = JSON.parse(user.roleJson);
      return roles.some((role: any) => role.roleId === roleId);
    } catch (e) {
      console.error('Error parsing roleJson', e);
      return false;
    }
  }
}

