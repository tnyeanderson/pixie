package handlers

import (
	"net/http"
	"text/template"
)

type TextRenderData struct {
	PixieHost string
	UserData  map[string]interface{}
}

type TextRender struct {
	TemplatePath string
	Data         TextRenderData
}

func (t *TextRender) Render(w http.ResponseWriter) error {
	// TODO: Need proper error handling here
	tmpl, err := template.ParseFiles(t.TemplatePath)
	if err != nil {
		return err
	}
	err = tmpl.Execute(w, t.Data)
	if err != nil {
		return err
	}
	return nil
}

func (t *TextRender) WriteContentType(w http.ResponseWriter) {
	header := w.Header()
	header["Content-Type"] = []string{"text/plain"}
}
