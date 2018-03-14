/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;

    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }

    localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
    if (!name) return;
    return localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
    if (!name) return;
    localStorage.removeItem(name);
}


