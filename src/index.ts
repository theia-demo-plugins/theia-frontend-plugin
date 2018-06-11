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
import {initEditorsCommands} from './editor';
const disposables: theia.Disposable[] = [];

export function start() {
    initEditorsCommands();
    const command: theia.Command = {
        id: 'simple-frontend-plugin-command',
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

    const informationMessageTestCommand = {
        id: 'frontend-plugin-information-message-command',
        label: "Test Information Message Item"
    };
    disposables.push(theia.commands.registerCommand(informationMessageTestCommand, (...args: any[]) => {
        theia.window.showInformationMessage('Information message!');
    }));

    const informationModalMessageTestCommand = {
        id: 'frontend-plugin-information-modal-message-command',
        label: "Test Information Modal Message Item"
    };
    disposables.push(theia.commands.registerCommand(informationModalMessageTestCommand, (...args: any[]) => {
        theia.window.showInformationMessage('Information modal message!', {modal: true}, {title: 'action1'},
            {title: 'action2', isCloseAffordance: true}, {title: 'action3'}).then(action => {
            console.log('>>> resolve', action);
        });
    }));

    const warningMessageTestCommand = {
        id: 'frontend-plugin-warning-message-command',
        label: "Test Warning Message Item"
    };
    disposables.push(theia.commands.registerCommand(warningMessageTestCommand, (...args: any[]) => {
        theia.window.showWarningMessage('Warning message!');
    }));

    const warningModalMessageTestCommand = {
        id: 'frontend-plugin-warning-modal-message-command',
        label: "Test Warning Modal Message Item"
    };
    disposables.push(theia.commands.registerCommand(warningModalMessageTestCommand, (...args: any[]) => {
        theia.window.showWarningMessage('Warning modal message!', {modal: true});
    }));

    const errorMessageTestCommand = {
        id: 'frontend-plugin-error-message-command',
        label: "Test Error Message Item"
    };
    disposables.push(theia.commands.registerCommand(errorMessageTestCommand, (...args: any[]) => {
        theia.window.showErrorMessage('Error message!');
    }));

    const errorModalMessageTestCommand = {
        id: 'frontend-plugin-error-modal-message-command',
        label: "Test Error Modal Message Item"
    };
    disposables.push(theia.commands.registerCommand(errorModalMessageTestCommand, (...args: any[]) => {
        theia.window.showErrorMessage('Error modal message!', {modal: true});
    }));

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
    }), option).then((val: string | undefined) => {
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

