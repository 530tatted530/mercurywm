import Constants, { mmmCode, createFile, createDirectory, createWorkspace } from './constants';

// INITIAL STATE
const id = Date.now();
const defaultStateObject = { [Constants.STATE_KEY]: {
    workspaces: [createWorkspace(id)],
    wfs: createDirectory('~', [
            createFile('Welcome', 'Welcome to MercuryWM! Type "help" to get started!\n'),
            createDirectory('.bin', [
                createFile('mmm', mmmCode)
            ]),
            createDirectory('.man', [])
        ]
    ),
    wsh: {
        // environmental variables
        env: {
            'background': '#aaa',
            'title': 'MercuryWM 1.1',
            'prompt': '%w $ ',
            'username': Constants.NAME,
        }
    },
    selectedWindow: id,
    selectedWorkspace: 0
}};

function load(callback) {
    chrome.storage.local.get(defaultStateObject, data => {
        callback(data[Constants.STATE_KEY]);
    });
}

function clear() {
    chrome.storage.local.clear(() => {
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
    return defaultStateObject[Constants.STATE_KEY];
}

function save(state) {
    chrome.storage.local.set({ [Constants.STATE_KEY]: state });
}

module.exports = {
    clear,
    load,
    save
};
