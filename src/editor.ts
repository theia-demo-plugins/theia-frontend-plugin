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
import { CONSOLE_OUTPUT_PREFIX, COMMAND_NAME_PREFIX, PLUGIN_NAME } from './common/constants';

export function initEditorsCommands(disposables: theia.Disposable[]) {

    disposables.push(theia.workspace.onDidOpenTextDocument(e => {
        console.log(CONSOLE_OUTPUT_PREFIX, `Text Document opened: ${e.uri}`);
    }));

    disposables.push(theia.workspace.onDidCloseTextDocument(e => {
        console.log(CONSOLE_OUTPUT_PREFIX, `Text Document closed: ${e.uri}`);
    }));


    disposables.push(theia.workspace.onDidChangeTextDocument(e => {
        if(e.contentChanges.length !== 0) {
            console.log(CONSOLE_OUTPUT_PREFIX, `Text Document Changed: 'changes: ${JSON.stringify(e.contentChanges)}', 'document: ${e.document.uri}'`);
        }
    }));

    disposables.push(theia.window.onDidChangeActiveTextEditor(e => {
        if (e) {
            console.log(CONSOLE_OUTPUT_PREFIX, `Active Editor Changed: ${e.document.uri}`);
        } else {
            console.log(CONSOLE_OUTPUT_PREFIX, 'All editors are closed');
        }
    }));

    disposables.push(theia.window.onDidChangeTextEditorOptions(e => {
        console.log(CONSOLE_OUTPUT_PREFIX, `Text Editor options changed: ${e.options}`);
    }));

    disposables.push(theia.window.onDidChangeTextEditorSelection(e => {
        if (e.selections.length === 1) {
            const sel = e.selections[0];
            console.log(CONSOLE_OUTPUT_PREFIX, `Cursor position is: Ln: ${sel.end.line+1}, Col: ${sel.end.character+1}`);
        }
    }));

    disposables.push(theia.window.onDidChangeTextEditorVisibleRanges(e => {
        console.log(CONSOLE_OUTPUT_PREFIX, `Text Editor: ${e.textEditor.document.uri} visible ranges: ${JSON.stringify(e.visibleRanges)}`);
    }));

    disposables.push(theia.commands.registerCommand(
        { id: PLUGIN_NAME + 'change editor', label: COMMAND_NAME_PREFIX + 'Select Editor Cursor' }, () => {
        theia.window.showQuickPick(["Block","BlockOutline", "Line", "Underline", "LineThin", "UnderlineThin" ],{placeHolder:"Select Cursor"}).then((c: string| undefined) =>{
            let cursorStyle: theia.TextEditorCursorStyle = theia.TextEditorCursorStyle.Line;
            switch(c!){
                case "Block":
                cursorStyle  = theia.TextEditorCursorStyle.Block;
                break;
                case "BlockOutline":
                cursorStyle  = theia.TextEditorCursorStyle.BlockOutline;
                break;
                case "Line":
                cursorStyle  = theia.TextEditorCursorStyle.Line;
                break;
                case "Underline":
                cursorStyle = theia.TextEditorCursorStyle.Underline;
                break;
                case "LineThin":
                cursorStyle  = theia.TextEditorCursorStyle.LineThin;
                break;
                case "UnderlineThin":
                cursorStyle  = theia.TextEditorCursorStyle.UnderlineThin;
                break;
            }
            theia.window.activeTextEditor!.options = { cursorStyle: cursorStyle };
        });
    }));

    disposables.push(theia.commands.registerCommand({
        id: PLUGIN_NAME + 'reveal range test', label: COMMAND_NAME_PREFIX + 'Test Reveal Range'}, () => {
        theia.window.activeTextEditor!.revealRange(new theia.Range(new theia.Position(32, 4), new theia.Position(34,0)), theia.TextEditorRevealType.InCenter);
    }));

    disposables.push(theia.commands.registerCommand(
        { id: PLUGIN_NAME + 'test editor edit', label: COMMAND_NAME_PREFIX + 'Test EditorEdit' }, () => {
        const editor = theia.window.activeTextEditor;
        if (editor) {
            editor.edit(edit => {
                edit.insert(new theia.Position(0,0),'Hello from Plugin Editor API');
            });
        }
    }));

    disposables.push(theia.commands.registerCommand(
        { id: PLUGIN_NAME + 'test editor snippet', label: COMMAND_NAME_PREFIX + 'Test Editor Snippet' }, () => {
        const editor = theia.window.activeTextEditor;
        if (editor) {
            editor.insertSnippet(new theia.SnippetString('Hello from ${1|snippet,one,two|},current year: ${CURRENT_YEAR}\n\t${2:some}-Dir:${TM_DIRECTORY}, File:${TM_FILEPATH}$0'));
        }
    }));

    disposables.push(theia.commands.registerCommand(
        { id: PLUGIN_NAME + 'test editor decoration', label: COMMAND_NAME_PREFIX + 'Test Editor Decoration' }, () => {
        const editor = theia.window.activeTextEditor;
        if (editor) {
            const decoration1 = theia.window.createTextEditorDecorationType({color: 'red', textDecoration: 'underline overline dotted',cursor:'pointer',});
            editor.setDecorations(decoration1, [new theia.Range(0,0,0,9)]);
            const decoration2 = theia.window.createTextEditorDecorationType({color: 'green'})
            editor.setDecorations(decoration2, [{range:  new theia.Range(1,0,1,5), hoverMessage: new theia.MarkdownString('Hello From Plugin')}])
            setTimeout(() => {
                decoration1.dispose();
            }, 5000);
        }
    }));
}
