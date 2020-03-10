import { type } from "../action";

let menus = JSON.parse(sessionStorage.getItem('sessionRedux')) ? JSON.parse(sessionStorage.getItem('sessionRedux')).menus : [];
let levelmenus = JSON.parse(sessionStorage.getItem('sessionRedux')) ? JSON.parse(sessionStorage.getItem('sessionRedux')).levelmenus : [];
let all_menus = JSON.parse(sessionStorage.getItem('ALL_MENUS')) ? JSON.parse(sessionStorage.getItem('ALL_MENUS')).all_menus: [];
let level_all_menus = JSON.parse(sessionStorage.getItem('ALL_MENUS')) ? JSON.parse(sessionStorage.getItem('ALL_MENUS')).level_all_menus: [];
let token = sessionStorage.getItem('sessionTOKEN') ? sessionStorage.getItem('sessionTOKEN') : '';
let user = sessionStorage.getItem('sessionUser') ? JSON.parse(sessionStorage.getItem('sessionUser')) : {};
let section = sessionStorage.getItem('sessionSection') ? JSON.parse(sessionStorage.getItem('sessionSection')) : [];
let tags = sessionStorage.getItem('sessionTags') ? JSON.parse(sessionStorage.getItem('sessionTags')) : [];

const initialState = {
  menuName: "首页",
  levelmenus,
  menus,
  all_menus,
  level_all_menus,
  token,
  user,
  section,
  tags
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.SWITH_MENU:
      return {
          ...state,
          menuName:action.menuName
      }
    case type.MENUS :
        sessionStorage.setItem('sessionRedux', JSON.stringify(action.menus))
      return{
        ...state,
        levelmenus:action.menus.levelmenus,
        menus:action.menus.menus,
      }
    case type.TOKEN :
      sessionStorage.setItem('sessionTOKEN', action.token)
      return {
        ...state,
        token:action.token
      }
    case type.USER :
      sessionStorage.setItem('sessionUser',JSON.stringify(action.user))
      return {
        ...state,
        user:action.user
      }
    case type.ALL_MENUS :
      sessionStorage.setItem('ALL_MENUS',JSON.stringify(action.all_menus))
      return {
        ...state,
        all_menus:action.all_menus.all_menus,
        level_all_menus:action.all_menus.level_all_menus
      }
    case type.SECTION :
        sessionStorage.setItem('sessionSection',JSON.stringify(action.section))
        return {
          ...state,
          section:action.section
      }
    case type.TAGS :
      sessionStorage.setItem('sessionTags',JSON.stringify(action.tags))
        return {
          ...state,
          tags:action.tags
      }
    default :
      return{
        ...state
      }  
  }
};