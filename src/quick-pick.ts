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
import { COMMAND_NAME_PREFIX, CONSOLE_OUTPUT_COMMAND_SUFIX, CONSOLE_OUTPUT_PREFIX } from './common/constants';

export function initQuickPickCommands(disposables: theia.Disposable[]) {
    const quickPickTestCommand = {
        id: 'demo-quick-pick-string-command',
        label: COMMAND_NAME_PREFIX + 'Quick Pick String Items' + CONSOLE_OUTPUT_COMMAND_SUFIX
    }
    disposables.push(theia.commands.registerCommand(quickPickTestCommand, (...args: any[]) => testQuickPick()));

    const quickPickTestObjCommand = {
        id: 'demo-quick-pick-object-command',
        label: COMMAND_NAME_PREFIX + 'Quick Pick Object Item' + CONSOLE_OUTPUT_COMMAND_SUFIX
    }
    disposables.push(theia.commands.registerCommand(quickPickTestObjCommand, (...args: any[]) => testQuickPickObject()));
}

function testQuickPick(): void {
    const option: theia.QuickPickOptions = {
        machOnDescription: true,
        machOnDetail: true,
        canPickMany: false,
        placeHolder: "Select string:",
        onDidSelectItem: (item) => console.log(CONSOLE_OUTPUT_PREFIX, `Item ${item} is selected`)
    };
    theia.window.showQuickPick(new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(["foo" + Math.round(Math.random()*10), "bar", "foobar"]);
        }, 500);
    }), option).then((val: string | undefined) => {
        console.log(CONSOLE_OUTPUT_PREFIX, `Quick Pick Selected: ${val}`);
    });
}

function testQuickPickObject() {
    const option: theia.QuickPickOptions = {
        machOnDescription: true,
        machOnDetail: true,
        canPickMany: false,
        placeHolder: "Select object:",
        onDidSelectItem: (item) => console.log(`Item ${JSON.stringify(item)} is selected`)
    };
    theia.window.showQuickPick<theia.QuickPickItem>(new Promise((resolve)=>{
        setTimeout(()=>{
            resolve([
                {
                    label : "foo" + Math.round(Math.random()*10),
                    description: "foo description",
                    detail: "foo detail"
                },
                {
                    label: "bar",
                    description: "bar description",
                    detail: "bar detail"
                },
                {
                    label: "foobar",
                    description: "foobar description",
                    detail: "foobar detail",
                    picked: true
}
            ]);
        }, 500);
    }), option).then((val: theia.QuickPickItem| undefined) => {
        console.log(CONSOLE_OUTPUT_PREFIX, `Quick Pick Object Selected: ${JSON.stringify(val)}`);
    });
}
