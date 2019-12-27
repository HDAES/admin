import { type } from "../action";

let menus = JSON.parse(sessionStorage.getItem('sessionRedux')) ? JSON.parse(sessionStorage.getItem('sessionRedux')).menus : [];
let levelmenus = JSON.parse(sessionStorage.getItem('sessionRedux')) ? JSON.parse(sessionStorage.getItem('sessionRedux')).levelmenus : [];
const initialState = {
  menuName: "首页",
  levelmenus,
  menus

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
        menus:action.menus.menus
      }
    default :
      return{
        ...state
      }  
  }
};