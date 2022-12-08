function populate() {

    jQuery.get(filename, function(data) {
        let text_elements = data.split('\n')
        for (let i=0;i<text_elements.length-1;i++) {
            let text_type = ""
            let text_type_str = ""
            let text = ""
            let text_element = text_elements[i];
            if (text_element.length > 0) {
                text_type_str = text_element.slice(0, 3);
                text = text_element.slice(-text_element.length+1 + 3)

                //Header 1
                if (text_type_str === "#h1") {
                    let h = document.createElement("h1");
                    let t = document.createTextNode(text);
                    h.appendChild(t);
                    h.style.marginBottom = "0.5em";
                    let sections = text.split(' ')
                    h.id = "Chapter " + sections[1];
                    console.log(h.id);
                    section_header.appendChild(h);
                }

                //Header 2
                if (text_type_str === "#h2") {
                    let hr = document.createElement("hr");
                    section_body.appendChild(hr);
                    let h = document.createElement("h3");
                    let t = document.createTextNode(text);
                    h.style.fontSize = "1.75em";
                    h.appendChild(t);
                    section_body.appendChild(h);
                }

                //Header 3
                if (text_type_str === "#h3") {
                    let h = document.createElement("h2");
                    let t = document.createTextNode(text);
                    h.appendChild(t);
                    h.style.marginTop = "2em";
                    let sections = text.split(' ')
                    h.id = sections[0];
                    section_body.appendChild(h);
                }

                //Paragraph
                if (text_type_str === "#pg") {
                    let h = document.createElement("p");
                    let t = document.createTextNode(text);
                    h.appendChild(t);
                    section_body.appendChild(h);
                }

                //Code Snippet
                if (text_type_str === "#br") {
                    let h = document.createElement("br");
                    section_body.appendChild(h);
                }


                //Code Snippet
                if (text_type_str === "#cc") {
                    elements = text.split("#")

                    let comment_italic = document.createElement('I')
                    let comment = document.createTextNode('#' + elements[1]);
                    let code_strong = document.createElement('strong')
                    let snippet = document.createElement("p");
                    let code = document.createTextNode(elements[0]);

                    comment_italic.appendChild(comment)
                    comment_italic.style.fontFamily = "JetBrains Mono"
                    comment_italic.style.fontSize = "10pt";
                    snippet.style.fontFamily = "JetBrains Mono"
                    snippet.style.fontSize = "10pt";
                    snippet.style.fontWeight = 200;
                    snippet.appendChild(code);
                    snippet.style.marginBottom = "10px";
                    snippet.style.width = "70%"
                    snippet.style.marginLeft = "15%"
                    snippet.style.marginRight = "15%"
                    snippet.style.marginBottom = "0";
                    section_body.appendChild(snippet);
                }

                //Code Snippet
                if (text_type_str === "#ce") {
                    elements = text.split("-")

                    let comment = document.createTextNode(' - ' + elements[1]);
                    let code_strong = document.createElement('strong')
                    let snippet = document.createElement("p");
                    let code = document.createTextNode(elements[0]);
                    code_strong.appendChild(code);
                    snippet.appendChild(code_strong);
                    snippet.style.marginTop = "20px";
                    snippet.appendChild(comment);
                    snippet.style.width = "70%"
                    snippet.style.marginLeft = "15%"
                    snippet.style.marginRight = "15%"
                    section_body.appendChild(snippet);
                }

                //Image
                if (text_type_str === "#im") {
                    tbl = document.createElement("table");
                    tblBody = document.createElement("tbody");
                    parameters = text.split(" ")
                    let figure_name = document.createElement('strong')
                    let caption_text = parameters.slice(3,5).join(' ')
                    let text_node = document.createTextNode(caption_text + " ");
                    let caption = document.createTextNode(parameters.slice(5).join(' '));
                    let figure_caption = document.createElement('pc')
                    figure_name.appendChild(text_node);
                    figure_caption.appendChild(text_node);
                    figure_caption.appendChild(caption);
                    let cell_width = parseFloat(parameters[1])
                    let filename = parameters[0];
                    for (let r = 0; r < 2; r++) {
                        row = document.createElement("tr");
                        for (let c = 0; c < 3; c++) {
                            let cell = document.createElement("td");
                            cell.style.backgroundColor = "white";
                            cell.style.textAlign = "center"
                            if (caption.length > 100) {
                                cell.style.textAlign = "left"
                            }
                            if (c === 1 && r === 1) {
                                cell.appendChild(figure_caption);
                            }
                            if (c === 1 && r === 0) {
                                cell.style.width = cell_width + "%"
                                let img = document.createElement("img");
                                img.src = filename
                                img.style.height = parameters[2] + "pt";
                                cell.appendChild(img);
                            }
                            if (c === 1) {
                                cell.style.width = cell_width + "%"
                                if (r === 0) {
                                    cell.style.textAlign = "center";
                                }
                            } else {
                                cell.style.width = ((100-cell_width)/2) + "%"
                            }
                            row.appendChild(cell);
                        }
                        tblBody.appendChild(row);
                    }
                    tbl.appendChild(tblBody);
                    section_body.appendChild(tbl);
                }

                //Caption Only
                if (text_type_str === "#ca") {
                    let h = document.createElement("p");
                    let elements = text.split("-");
                    let caption = "<strong>" + elements[0] + "</strong>" + " - " + elements[1];
                    // let t = document.createTextNode(caption);
                    // h.appendChild(t);
                    h.style.width = "70%";
                    h.style.marginLeft = "15%"
                    h.style.marginRight = "15%"
                    h.style.textAlign = "center"
                    h.innerHTML = caption
                    section_body.appendChild(h);
                }

                //Table
                if (text_type_str === "#ts") {
                    row = []
                    tbl = document.createElement("table");
                    elements = text.split(" ")
                    table_width = elements[0]
                    text_align = elements[1];
                    tbl.style.width = table_width + "%";
                    tblBody = document.createElement("tbody");
                }

                if (text_type_str === "#th") {
                    bold = true
                    row = document.createElement("tr");
                }

                if (text_type_str === "#tr") {
                    bold = false
                    row = document.createElement("tr");
                }

                if (text_type_str === "#tl") {
                    tblBody.appendChild(row);
                }

                if (text_type_str === "#tc") {
                    cell = document.createElement("td");
                    cell.style.fontSize = "10pt"
                    if (text !== "empty") {
                        if (text.indexOf("assets/figures") > -1) {
                            let elements = text.split(" ");
                            if (elements.length === 1) {
                                let img = document.createElement("img");
                                img.src = text
                                img.style.width = "100pt";
                                img.style.height = "100pt";
                                img.style.margin = "auto";
                                cell.style.textAlign = "center";
                                cell.style.verticalAlign = "center";
                                cell.appendChild(img);
                            }
                            if (elements.length === 2) {
                                let img = document.createElement("img");
                                img.src = elements[0]
                                img.style.width = "100pt";
                                img.style.height = "100pt";
                                img.style.cursor = "pointer";
                                img.style.marginRight = "50pt";
                                img.onclick = function() {
                                    window.location.target= '_blank';
                                    window.location.href = elements[1];
                                };
                                cell.appendChild(img);
                            }
                        } else {
                            cell_content = text
                            cell.style.textAlign = text_align;
                            if (bold === true) {
                                cell_content = "<strong>" + cell_content + "</strong>"
                                cell.style.backgroundColor = "rgba("+150+","+150+","+150+",0.1)";
                            }
                            cell.style.verticalAlign = "top";
                            cell.style.width = "20";
                            cell.innerHTML = cell_content
                        }
                    } else {
                        cell.innerHTML = " ";
                        if (bold === true) {
                            cell.style.backgroundColor = "rgba(" + 150 + "," + 150 + "," + 150 + ",0.1)";
                        }
                    }
                    cell.style.backgroundColor = "rgba("+255+","+255+","+255+",1.0)";
                    cell.style.padding = "1%";
                    row.appendChild(cell);
                }

                if (text_type_str === "#te") {
                    tbl.appendChild(tblBody);
                    section_body.appendChild(tbl);
                }

                //Matrix
                if (text_type_str === "#ms") {
                    row = []
                    tbl = document.createElement("table");
                    tblBody = document.createElement("tbody");
                }

                if (text_type_str === "#mh") {
                    bold = true
                    row = document.createElement("tr");
                }

                if (text_type_str === "#mr") {
                    bold = false
                    row = document.createElement("tr");
                }

                if (text_type_str === "#ml") {
                    tblBody.appendChild(row);
                }

                if (text_type_str === "#mc") {
                    cell = document.createElement("td");
                    cell.style.fontSize = "12pt"
                    if (text !== "empty") {
                        if (text.indexOf("assets/figures") > -1) {
                            let elements = text.split(" ");
                            if (elements.length === 1) {
                                let img = document.createElement("img");
                                img.src = text
                                img.style.width = "150px";
                                cell.style.textAlign = "center"
                                cell.appendChild(img);
                            }
                        } else {
                            cell_content = text
                            if (bold === true) {
                                cell_content = "<strong>" + cell_content + "</strong>"
                            }
                            cell.style.verticalAlign = "top";
                            cell.style.width = "10%"
                            cell.style.textAlign = "center"
                            cell.innerHTML = cell_content
                        }
                    } else {
                        cell.innerHTML = " ";
                    }
                    row.appendChild(cell);
                }

                if (text_type_str === "#me") {
                    tbl.appendChild(tblBody);
                    tbl.style.width = "50%";
                    section_body.appendChild(tbl);
                }

                //List
                if (text_type_str === "#ls") {
                    row = []
                    tbl = document.createElement("table");
                    tblBody = document.createElement("tbody");
                }

                if (text_type_str === "#lh") {
                    bold = true
                    row = document.createElement("tr");
                }

                if (text_type_str === "#lr") {
                    bold = false
                    row = document.createElement("tr");
                }

                if (text_type_str === "#ll") {
                    tblBody.appendChild(row);
                }

                if (text_type_str === "#lc") {
                    cell = document.createElement("td");
                    cell.style.fontSize = "12pt"
                    cell.style.backgroundColor = "#fff";
                    if (text !== "empty") {
                        if (text.indexOf("assets/figures") > -1) {
                            let elements = text.split(" ");
                            if (elements.length === 1) {
                                let img = document.createElement("img");
                                img.style.height = "50pt";
                                img.style.width = "50pt";
                                cell.style.width = "100pt";
                                cell.style.margin = "auto";
                                cell.style.textAlign = "center";
                                img.src = text
                                cell.appendChild(img);
                            }
                            if (elements.length === 2) {
                                let img = document.createElement("img");
                                img.src = elements[0]
                                img.style.cursor = "pointer";
                                img.onclick = function() {
                                    window.location.target= '_blank';
                                    window.location.href = elements[1];
                                };
                                img.style.height = "5%";
                                img.style.width = "5%";
                                cell.style.height = "50pt";
                                cell.appendChild(img);
                            }
                        } else {
                            cell_content = text
                            if (bold === true) {
                                cell_content = "<strong>" + cell_content + "</strong>"
                                cell.style.verticalAlign = "middle";
                                cell.style.fontSize = "16pt"
                            }
                            cell.innerHTML = cell_content
                        }
                    } else {
                        cell.innerHTML = " ";
                    }
                    row.appendChild(cell);
                }

                if (text_type_str === "#le") {
                    tbl.appendChild(tblBody);
                    section_body.appendChild(tbl);
                }


                //Equation
                if (text_type_str === "#eq") {
                    tbl = document.createElement("table");
                    tblBody = document.createElement("tbody");
                    parameters = text.split("\t")
                    let equation = parameters[0]
                    let equation_size = parameters[2]
                    let equation_number = parameters[5]
                    let equation_name = document.createElement('strong')
                    let caption_text = parameters.slice(3,4).join(' ')
                    let text_node = document.createTextNode(caption_text + " ");
                    let caption = document.createTextNode(parameters.slice(4,-1).join(' '));
                    let equation_caption = document.createElement('p')
                    equation_name.appendChild(text_node);
                    equation_caption.appendChild(equation_name);
                    equation_caption.appendChild(caption);

                    let cell_width = parseFloat(parameters[1])
                    let filename = parameters[0];
                    for (let r = 0; r < 2; r++) {
                        row = document.createElement("tr");
                        for (let c = 0; c < 3; c++) {
                            let cell = document.createElement("td");
                            cell.style.backgroundColor = "white";
                            if (caption.length > 50) {
                                cell.style.textAlign = "left"
                            } else {
                                cell.style.textAlign = "center"
                            }
                            if (c === 1 && r === 1) {
                                if (caption_text !== "empty") {
                                    cell.appendChild(equation_caption);
                                }
                            }
                            if (c === 1 && r === 0) {
                                let equation_div = document.createElement("div");
                                equation_div.className = "math"
                                equation_div.style.textAlign = "center";
                                equation_div.innerHTML = equation
                                // equation_div.style.height = "20pt";
                                equation_div.style.fontSize = equation_size + "pt";
                                cell.appendChild(equation_div);
                            }
                            if (c === 2 && r === 0) {
                                let equation_id_div = document.createElement("div");
                                equation_id_div.className = "math"
                                equation_id_div.style.textAlign = "left";
                                equation_id_div.innerHTML = "(" + equation_number + ")"
                                // equation_id_div.style.height = "20pt";
                                cell.appendChild(equation_id_div);
                            }

                            if (c === 1 && r > -1) {
                                cell.style.width = cell_width + "%"
                                if (r === 0) {
                                    cell.style.textAlign = "center";
                                }
                            } else {
                                cell.style.width = ((100-cell_width)/2) + "%"
                            }
                            if (caption_text === "empty" && r > 0) {
                            } else {
                                row.appendChild(cell);
                            }
                            tblBody.appendChild(row);
                        }
                    }
                    tbl.appendChild(tblBody);
                    section_body.appendChild(tbl);
                }

                //References
                if (text_type_str === "#bs") {
                    blt = document.createElement("ul");
                }

                if (text_type_str === "#bp") {
                    let h = document.createElement("li");
                    let t = document.createTextNode(text);
                    h.appendChild(t);
                    blt.appendChild(h);
                }

                if (text_type_str === "#be") {
                    section_body.appendChild(blt);
                }

                //Book Table Table
                if (text_type_str === "#qs") {
                    let h = document.createElement("br");
                    section_body.appendChild(h);
                    row = []
                    tbl = document.createElement("table");
                    elements = text.split(" ")
                    table_width = elements[0]
                    text_align = elements[1];
                    tbl.style.width = table_width + "%";
                    tblBody = document.createElement("tbody");
                }

                if (text_type_str === "#qh") {
                    bold = true
                    row = document.createElement("tr");
                }

                if (text_type_str === "#qr") {
                    bold = false
                    row = document.createElement("tr");
                }

                if (text_type_str === "#ql") {
                    tblBody.appendChild(row);
                }

                if (text_type_str === "#qc") {
                    cell = document.createElement("td");
                    //cell.style.fontSize = "10pt"
                    if (text !== "empty") {
                        if (text.indexOf("assets/figures") > -1) {
                            let elements = text.split(" ");
                            if (elements.length === 2) {
                                let img = document.createElement("img");
                                img.src = elements[0]
                                img.style.cursor = "pointer";
                                img.style.marginBottom = "50pt";
                                img.onclick = function() {
                                    window.location.target= '_blank';
                                    window.location.href = elements[1];
                                };
                                cell.style.width = "20%";
                                cell.appendChild(img);
                            }
                        } else {
                            let text_elements = text.split("@");
                            authors_content = text_elements[0];
                            authors_content = "<qh2>" + authors_content + "</qh2>"
                            title_content = text_elements[1];
                            title_content = "<qh1>" + title_content + "</qh1>"
                            description_content = text_elements[2];
                            description_content = "<qp>" + description_content + "</qp>"
                            cell_content = title_content + "<br>" + authors_content + "<br>" + description_content;
                            cell.style.backgroundColor = "rgba("+150+","+150+","+150+",0.1)";
                            cell.style.textAlign = "left";
                            cell.style.verticalAlign = "top";
                            cell.style.width = "60%";
                            cell.style.height = "300pt";
                            cell.style.paddingLeft = "0%";
                            cell.innerHTML = cell_content
                        }
                    } else {
                        cell.innerHTML = " ";
                        if (bold === true) {
                            cell.style.backgroundColor = "rgba(" + 150 + "," + 150 + "," + 150 + ",0.1)";
                        }
                    }
                    cell.style.backgroundColor = "rgba("+255+","+255+","+255+",1.0)";
                    row.appendChild(cell);
                }

                if (text_type_str === "#qe") {
                    tbl.appendChild(tblBody);
                    section_body.appendChild(tbl);
                }

                //Book Table Table
                if (text_type_str === "#ws") {
                    let h = document.createElement("br");
                    section_body.appendChild(h);
                    row = []
                    tbl = document.createElement("table");
                    elements = text.split(" ")
                    table_width = elements[0]
                    text_align = elements[1];
                    tbl.style.width = table_width + "%";
                    tblBody = document.createElement("tbody");
                }

                if (text_type_str === "#wh") {
                    bold = true
                    row = document.createElement("tr");
                }

                if (text_type_str === "#wr") {
                    bold = false
                    row = document.createElement("tr");
                }

                if (text_type_str === "#wl") {
                    tblBody.appendChild(row);
                }

                if (text_type_str === "#wc") {
                    cell = document.createElement("td");
                    //cell.style.fontSize = "10pt"
                    if (text !== "empty") {
                        if (text.indexOf("assets/figures") > -1) {
                            let elements = text.split(" ");
                            if (elements.length === 1) {
                                let img = document.createElement("img");
                                img.src = elements[0]
                                img.style.width = "100pt";
                                img.style.cursor = "pointer";
                                img.style.marginTo = "250pt";
                                img.onclick = function() {
                                    window.location.target= '_blank';
                                    window.location.href = elements[1];
                                };
                                cell.style.width = "10%";
                                cell.appendChild(img);
                            }
                        } else {
                            let text_elements = text.split("@");
                            let text_string = "<wh3>";
                            for (let i=0;i<text_elements.length;i++) {
                                text_string = text_string + text_elements[i] + "<br>";
                            }
                            cell_content = text_string + "</wh3>";
                            cell.style.backgroundColor = "rgba("+250+","+150+","+150+",0.1)";
                            cell.style.textAlign = "left";
                            cell.style.verticalAlign = "top";
                            cell.style.width = "60%";
                            // cell.style.height = "300pt";
                            cell.style.paddingLeft = "0%";
                            cell.innerHTML = cell_content
                        }
                    } else {
                        cell.innerHTML = " ";
                        if (bold === true) {
                            cell.style.backgroundColor = "rgba(" + 150 + "," + 150 + "," + 150 + ",0.1)";
                        }
                    }
                    cell.style.backgroundColor = "rgba("+255+","+255+","+255+",1.0)";
                    row.appendChild(cell);
                }

                if (text_type_str === "#we") {
                    tbl.appendChild(tblBody);
                    section_body.appendChild(tbl);
                }

                //Table Condensed
                if (text_type_str === "#ns") {
                    row = []
                    tbl = document.createElement("table");
                    elements = text.split(" ")
                    table_width = elements[0]
                    text_align = elements[1];
                    tbl.style.width = table_width + "%";
                    tblBody = document.createElement("tbody");
                }

                if (text_type_str === "#nh") {
                    bold = true
                    row = document.createElement("tr");
                }

                if (text_type_str === "#nr") {
                    bold = false
                    row = document.createElement("tr");
                }

                if (text_type_str === "#nl") {
                    tblBody.appendChild(row);
                }

                if (text_type_str === "#nc") {
                    cell = document.createElement("td");
                    cell.style.fontSize = "14pt"
                    if (text !== "empty") {
                        if (text.indexOf("assets/figures") > -1) {
                            let elements = text.split(" ");
                            if (elements.length === 1) {
                                let img = document.createElement("img");
                                img.src = text
                                img.style.width = "100pt";
                                img.style.height = "100pt";
                                img.style.margin = "auto";
                                cell.style.textAlign = "center";
                                cell.style.verticalAlign = "center";
                                cell.appendChild(img);
                            }
                            if (elements.length === 2) {
                                let img = document.createElement("img");
                                img.src = elements[0]
                                img.style.width = "100pt";
                                img.style.height = "100pt";
                                img.style.cursor = "pointer";
                                img.style.marginRight = "50pt";
                                img.onclick = function() {
                                    window.location.target= '_blank';
                                    window.location.href = elements[1];
                                };
                                cell.appendChild(img);
                            }
                        } else {
                            cell_content = text
                            cell.style.textAlign = text_align;
                            if (bold === true) {
                                cell_content = "<strong>" + cell_content + "</strong>"
                                cell.style.backgroundColor = "rgba("+150+","+150+","+150+",0.1)";
                            }
                            cell.style.verticalAlign = "top";
                            cell.style.width = "20";
                            cell.innerHTML = cell_content
                        }
                    } else {
                        cell.innerHTML = " ";
                        if (bold === true) {
                            cell.style.backgroundColor = "rgba(" + 150 + "," + 150 + "," + 150 + ",0.1)";
                        }
                    }
                    cell.style.backgroundColor = "rgba("+255+","+255+","+255+",1.0)";
                    cell.style.padding = "1%";
                    row.appendChild(cell);
                }

                if (text_type_str === "#ne") {
                    tbl.appendChild(tblBody);
                    section_body.appendChild(tbl);
                }

                //Image
                if (text_type_str === "#it") {
                    let filename = parameters[0];
                    tbl = document.createElement("div");
                    tbl.style.width = "100%";
                    tblBody = document.createElement("tbody");
                    parameters = text.split(" ")
                    let img = document.createElement("img");
                    img.src = filename
                    img.style.height = parameters[2] + "pt";
                    // img.style.height = "128pt";
                    img.style.padding = "2%";
                    if (filename.indexOf("logos") > -1) {
                        section_body.appendChild(img);
                    }

                    // let caption_text = parameters.slice(3,5).join(' ')
                    // let text_node = document.createTextNode(caption_text + " ");
                    // let caption = document.createTextNode(parameters.slice(5).join(' '));
                    // let figure_caption = document.createElement('pc')
                    // figure_name.appendChild(text_node);
                    // figure_caption.appendChild(text_node);
                    // figure_caption.appendChild(caption);
                    // let cell_width = parseFloat(parameters[1])
                    // cell_width = 10;
                    // for (let r = 0; r < 1; r++) {
                    //     row = document.createElement("tr");
                    //     for (let c = 1; c < 2; c++) {
                    //         let cell = document.createElement("td");
                    //         cell.style.backgroundColor = "white";
                    //         cell.style.textAlign = "center"
                    //         if (c === 1 && r === 0) {
                    //             cell.style.width = cell_width + "%"
                    //             let img = document.createElement("img");
                    //             img.src = filename
                    //             img.style.height = parameters[2] + "pt";
                    //             cell.appendChild(img);
                    //         }
                    //         if (c === 1) {
                    //             cell.style.width = cell_width + "%"
                    //             cell.style.width = "50%";
                    //             if (r === 0) {
                    //                 cell.style.textAlign = "left";
                    //             }
                    //         }
                    //         row.appendChild(cell);
                    //     }
                    //     tblBody.appendChild(row);
                    // }
                    // tbl.appendChild(tblBody);
                }

            }
        }
    });
}
