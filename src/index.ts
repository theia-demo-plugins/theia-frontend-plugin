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

import * as theia from '@wiptheia/plugin';
import { COMMAND_NAME_PREFIX, CONSOLE_OUTPUT_COMMAND_SUFIX, CONSOLE_OUTPUT_PREFIX, PLUGIN_NAME } from './common/constants';
import { initEditorsCommands } from './editor';
import { initEnvCommands } from './env';
import { initWindowStateCommands } from './window-state';
import { initQuickPickCommands } from './quick-pick';
import { initMessagesCommands } from './messages';

const disposables: theia.Disposable[] = [];

export function start() {
    initEditorsCommands(disposables);
    initEnvCommands(disposables);
    initWindowStateCommands(disposables);
    initQuickPickCommands(disposables);
    initMessagesCommands(disposables);

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
