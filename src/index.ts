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
import * as _ from 'lodash';
const disposables: theia.Disposable[] = [];

export function start() {
    const command: theia.Command = {
        id: 'simple-plugin-command',
        label: 'Command from simple plugin'
    };
    disposables.push(
        theia.commands.registerCommand(command, (...args: any[]) => {
            console.log(`>>> Simple plugin command handler was called with arguments: `, args);

            if (typeof (_ as any).all === 'undefined') {
                console.log('>>> Lodash v4 is present');
            }
        })
    );
    const quickPickTestCommand = {
        id: 'simple-plugin-quick-pick-string-command',
        label: "Test Quick Pick String Items"
    }
    disposables.push(theia.commands.registerCommand(quickPickTestCommand, (...args: any[]) => testQuickPick()));

    const quickPickTestObjCommand = {
        id: 'simple-plugin-quick-pick-object-command',
        label: "Test Quick Pick Object Item"
    }
    disposables.push(theia.commands.registerCommand(quickPickTestObjCommand, (...args: any[]) => testQuickPickObject()));


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
    }), option).then((val: theia.QuickPickItem[] | undefined) => {
        console.log(`Quick Pick Object Selected: ${JSON.stringify(val)}`);
    });
}

function testQuickPick(): void {
    const option: theia.QuickPickOptions = {
        machOnDescription: true,
        machOnDetail: true,
        canPickMany: false,
        placeHolder: "Select string:",
        onDidSelectItem: (item) => console.log(`Item ${item} is selected`)
    };
    theia.window.showQuickPick(new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(["foo" + Math.round(Math.random()*10), "bar", "foobar"]);
        }, 500);
    }), option).then((val: string[] | undefined) => {
        console.log(`Quick Pick Selected: ${val}`);
    });
}
export function stop() {
    while (disposables.length) {
        const disposable = disposables.pop();
        if (disposable) {
            disposable.dispose();
        }
    }
}

