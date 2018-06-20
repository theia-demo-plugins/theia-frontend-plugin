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

export function initQuickPickCommands() {

    registerCommand({
        id: 'quick-pick-string-command',
        label: 'Quick Pick String Items' + CONSOLE_OUTPUT_COMMAND_SUFIX,
        callback: () => {
            theia.window.showQuickPick(new Promise(async (resolve) => {
                await sleep(500);
                resolve(['foo' + Math.round(Math.random() * 10), 'bar', 'foobar']);
            }), {
                machOnDescription: true,
                machOnDetail: true,
                canPickMany: false,
                placeHolder: 'Select string:',
                onDidSelectItem: (item: string) => console.log(CONSOLE_OUTPUT_PREFIX, `Item ${item} is selected`)
            }).then((val: string | undefined) => {
                console.log(CONSOLE_OUTPUT_PREFIX, `Quick Pick Selected: ${val}`);
            });
        }
    });

    registerCommand({
        id: 'quick-pick-object-command',
        label: 'Quick Pick Object Item' + CONSOLE_OUTPUT_COMMAND_SUFIX,
        callback: () => {
            theia.window.showQuickPick<theia.QuickPickItem>(new Promise(async (resolve) => {
                await sleep(500);
                resolve([
                    {
                        label: 'foo' + Math.round(Math.random() * 10),
                        description: 'foo description',
                        detail: 'foo detail'
                    },
                    {
                        label: 'bar',
                        description: 'bar description',
                        detail: 'bar detail'
                    },
                    {
                        label: 'foobar',
                        description: 'foobar description',
                        detail: 'foobar detail',
                        picked: true
                    }
                ]);
            }), {
                machOnDescription: true,
                machOnDetail: true,
                canPickMany: false,
                placeHolder: 'Select object:',
                onDidSelectItem: (item: theia.QuickPickItem) => console.log(`Item ${JSON.stringify(item)} is selected`)
            }).then((val: theia.QuickPickItem | undefined) => {
                console.log(CONSOLE_OUTPUT_PREFIX, `Quick Pick Object Selected: ${JSON.stringify(val)}`);
            });
        }
    });
}
