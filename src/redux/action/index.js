export const type = {
    SWITH_MENU:'SWITH_MENU',
    MENUS:'MENUS'
}

export function getMenus(menus){
    return {
        type:type.MENUS,
        menus
    }
}

export function switchMenu(menuName){
    return {
        type:type.SWITH_MENU,
        menuName
    }
}