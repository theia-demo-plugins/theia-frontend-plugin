/*
 * Copyright (c) 2018-2018 Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

import * as theia from '@theia/plugin';
import { registerCommand, sleep } from './index';

export function initTerminalCommands() {

    registerCommand({
        id: "terminal-created-with-help-args",
        label: "Create terminal with help arguments",
        callback: () => {
            const terminal = theia.window.createTerminal("Sh Terminal", "sh", ["-l"]);
            terminal.show();
        }
    });

    registerCommand({
        id: "terminal-created-with-help-options", 
        label: "Create terminal with help options",
        callback: () => {
            const termOptions: theia.TerminalOptions = {
                name: "Test terminal",
                shellPath: "/bin/bash",
                shellArgs: ["-l"],
                env: {"HELLO": "Hello Theia."},
                // cwd: "/home/user/projects/theia" // any existed absolute path or url to the folder
            }
            const terminal = theia.window.createTerminal(termOptions);
            terminal.show();
        }
    });

    registerCommand({
        id: "send-text-to-the-terminal", 
        label: "Send text to the terminal",
        callback: () => {
            const terminal = createTerminalWithOptions();
            terminal.show();
            terminal.sendText("clear && echo Theia plugin terminal.", true);
        }
    });

    registerCommand({
        id: "plugin-hide-terminal-panel",
        label: "Hide terminal panel after 3 sec",
        callback: async () => {
            const terminal = createTerminalWithOptions();
            terminal.show();

            await sleep(3000);
            terminal.hide();
        }
    });

    registerCommand({
        id: "show-terminal-with-delay", 
        label: "Show terminal after 3 sec",
        callback: async () => {
            const terminal = createTerminalWithOptions();
            await sleep(3000);
            terminal.show();
        }
    });

    registerCommand({
        id: "dispose-terminal",
        label: "Dispose terminal after 3 sec", 
        callback: async () => {
            const terminal = createTerminalWithOptions();
            terminal.show();
            await sleep(3000);
            terminal.dispose();
        }
    });

    registerCommand({
        "id": "subscribe-on-did-close-terminal-event",
        "label": "Subscribe to onDidCloseTerminal event",
        callback: async () => {
            const terminal = createTerminalWithOptions();
            terminal.show();

            const createTermId: number = await terminal.processId;
            theia.window.onDidCloseTerminal(async (term) => {
                const termToCloseId = await term.processId;
                if (termToCloseId === createTermId) {
                    console.log("Terminal closed, id: ", createTermId);
                }
            }, createTermId);
        }
    });
}

function createTerminalWithOptions(): theia.Terminal {
    const termOptions: theia.TerminalOptions = {
        name: "Test terminal",
        shellPath: "/bin/bash"
    }
    return theia.window.createTerminal(termOptions);
}
