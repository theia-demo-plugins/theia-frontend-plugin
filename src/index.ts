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
import { COMMAND_NAME_PREFIX, CONSOLE_OUTPUT_COMMAND_SUFIX, CONSOLE_OUTPUT_PREFIX, PLUGIN_NAME } from './common/constants';
import { initEditorsCommands } from './editor';
import { initEnvCommands } from './env';
import { initWindowStateCommands } from './window-state';
import { initQuickPickCommands } from './quick-pick';
import { initMessagesCommands } from './messages';
import { initStatusBarCommands } from './status-bar-message';
import { initOutputChannelCommands } from './outpu-channel';

const disposables: theia.Disposable[] = [];

export function start() {
    initEditorsCommands(disposables);
    initWindowStateCommands(disposables);
    initEnvCommands();
    initQuickPickCommands();
    initMessagesCommands();
    initStatusBarCommands();
    initOutputChannelCommands();

    // Hello World command
    const command: theia.Command = {
        id: PLUGIN_NAME + 'simple-command',
        label: COMMAND_NAME_PREFIX + 'Hello World command' + CONSOLE_OUTPUT_COMMAND_SUFIX
    };
    disposables.push(
        theia.commands.registerCommand(command, (...args: any[]) => {
            console.log(CONSOLE_OUTPUT_PREFIX + `Hello World command handler was called with arguments: `, args);
        })
    );
}

export function stop() {
    while (disposables.length) {
        const disposable = disposables.pop();
        if (disposable) {
            disposable.dispose();
        }
    }
}

export function registerCommand(command: { id: string, label: string, callback: (...args: any[]) => any }): void {
    disposables.push(
        theia.commands.registerCommand({
            id: PLUGIN_NAME + command.id,
            label: COMMAND_NAME_PREFIX + command.label
        }, command.callback)
    );
}

export function sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}
