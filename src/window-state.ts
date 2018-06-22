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
import { CONSOLE_OUTPUT_COMMAND_SUFIX, CONSOLE_OUTPUT_PREFIX } from './common/constants';
import { registerCommand, sleep } from './index';

export function initWindowStateCommands(disposables: theia.Disposable[]) {

    registerCommand({
        id: 'show-window-state',
        label: 'Window State' + CONSOLE_OUTPUT_COMMAND_SUFIX,
        callback: () => {
            console.log(CONSOLE_OUTPUT_PREFIX, 'Window state: ', theia.window.state);
        }
    });

    registerCommand({
        id: 'show-window-state-delayed',
        label: 'Window State After 2.5 seconds' + CONSOLE_OUTPUT_COMMAND_SUFIX,
        callback: async () => {
            await sleep(2500);
            console.log(CONSOLE_OUTPUT_PREFIX, 'Window state: ', theia.window.state);
        }
    });

    disposables.push(
        theia.window.onDidChangeWindowState((windowState: theia.WindowState) => {
            console.log(CONSOLE_OUTPUT_PREFIX, 'Window focus: ', windowState.focused);
        })
    );
}
