export const type = {
    SWITH_MENU:'SWITH_MENU',
    MENUS:'MENUS',
    TOKEN:'TOKEN',
    USER:'USER',
    ALL_MENUS:'ALL_MENUS'
}
// 设置 用户的菜单
export function getMenus(menus){
    return {
        type:type.MENUS,
        menus
    }
}
// 设置 所有菜单
export function setAllMenus(all_menus){
    return {
        type:type.ALL_MENUS,
        all_menus
    }
}
// 设置 用户的TOKEN
export function SetUserToken (token){
    return {
        type:type.TOKEN,
        token
    }
}
// 设置 用户信息
export function setUser (user){
    return {
        type:type.USER,
        user
    }
}

export function switchMenu(menuName){
    return {
        type:type.SWITH_MENU,
        menuName
    }
}

