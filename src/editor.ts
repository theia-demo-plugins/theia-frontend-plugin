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
export function initEditorsCommands() {

    theia.workspace.onDidOpenTextDocument(e => {
        console.log(`Text Document opened: ${e.uri}`);
    });

    theia.workspace.onDidCloseTextDocument( e =>{
        console.log(`Text Document closed: ${e.uri}`);
    });

    theia.workspace.onDidChangeTextDocument( e =>{
        if(e.contentChanges.length !== 0){
            console.log(`Text Document Changed: 'changes: ${JSON.stringify(e.contentChanges)}', 'document: ${e.document.uri}'`);
        }
    });

    theia.window.onDidChangeActiveTextEditor( e =>{
        if(e){
                    console.log(`Active Editor Changed: ${e.document.uri}`);
        } else {
            console.log("All editors are closed");
        }
    });

    theia.window.onDidChangeTextEditorOptions( e => {
        console.log(`Text Editor options changed: ${e.options}`);
    });

    theia.window.onDidChangeTextEditorSelection(e => {
        if(e.selections.length === 1){
            const sel = e.selections[0];
            console.log(`Cursor position is: Ln: ${sel.end.line+1}, Col: ${sel.end.character+1}`);
        }
        
    });

    theia.window.onDidChangeTextEditorVisibleRanges(e => {
        console.log(`Text Editor: ${e.textEditor.document.uri} visible ranges: ${JSON.stringify(e.visibleRanges)}`);
    });

    theia.commands.registerCommand({id: "change editor",label: "Select Editor Cursor"}, ()=>{
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
            theia.window.activeTextEditor!.options ={cursorStyle: cursorStyle};
        });
    });

    theia.commands.registerCommand({id: 'reveal range test', label:'Test Reveal Range'}, ()=>{
        theia.window.activeTextEditor!.revealRange(new theia.Range(new theia.Position(32, 4), new theia.Position(34,0)), theia.TextEditorRevealType.InCenter);
    });

    theia.commands.registerCommand({id:'test editor edit',label:'Test EditorEdit'}, ()=>{
        const editor = theia.window.activeTextEditor;
        if(editor){
            editor.edit(edit=>{
                edit.insert(new theia.Position(0,0),'Hello from Plugin Editor API');
            });
        }
    });

    theia.commands.registerCommand({id:'test editor snippet', label:"Test Editor Snippet"}, ()=>{
        const editor = theia.window.activeTextEditor;
        if(editor){
            editor.insertSnippet(new theia.SnippetString('Hello from ${1|snippet,one,two|},current year: ${CURRENT_YEAR}\n\t${2:some}-Dir:${TM_DIRECTORY}, File:${TM_FILEPATH}$0'));
        }
    });

    theia.commands.registerCommand({id:'test editor decoration', label:'Test Editor Decoration'}, ()=>{
        const editor = theia.window.activeTextEditor;
        if(editor){
            const decoration1 = theia.window.createTextEditorDecorationType({color:'red', textDecoration:'underline overline dotted',cursor:'pointer',});
            editor.setDecorations(decoration1, [new theia.Range(0,0,0,9)]);
            const decoration2 = theia.window.createTextEditorDecorationType({color:'green'})
            editor.setDecorations(decoration2, [{range:  new theia.Range(1,0,1,5), hoverMessage:new theia.MarkdownString('Hello From Plugin')}])
            setTimeout(()=>{
                decoration1.dispose();
            }, 5000);
        }
    });

}
