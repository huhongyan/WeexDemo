export const PAGE_SIZE = 30

export const DEBUG = true

export const TOKEN_KEY = 'token'

export const navigatorbBarHeight = 100
export const statusHeight = 32
export const mainTabBarHeight = 120
export const reposDetailTopTabBarHeight = 80
export const controlBarHeight = 80

export const themeColor = '#009ff0'

export function getEntryPageStyle(Utils) {
    let mainHeight = `${getRealScreenHeight(Utils)}px`
    if (WXEnvironment.platform.toLowerCase() === 'ios') {
        if (Utils.env.isIPhoneX()) {
            return {
                height: mainHeight,
                width: '750px',
                marginTop: `${statusHeight + 44}px`
            }
        } else {
            return {
                height: mainHeight,
                width: '750px',
                marginTop: `${statusHeight}px`
            }
        }
    }
    return { height: mainHeight, width: '750px' }
}

export function getContentStyle(pageHeight, tabHeight) {
    return { height: pageHeight - tabHeight + 'px' }
}

export function getListBottomEmpty() {
    return WXEnvironment.platform.toLowerCase() === 'ios' ? '400px' : '200px'
}

export function getListHeight(height = 1234, Utils) {
    if (WXEnvironment.platform === 'Web') {
        return height
    }
    if (Utils.env.isIPhoneX()) {
        return height - statusHeight - 44
    }
    return height - statusHeight
}

export function getRealScreenHeight(Utils) {
    if (WXEnvironment.platform === 'Web') {
        return Utils.env.getScreenHeight()
    }
    return Utils.env.getScreenHeight() - statusHeight
}
