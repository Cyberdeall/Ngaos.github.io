from kivy.app import App
from kivy.uix.webview import WebView

class NgaosApp(App):
    def build(self):
        # GANTI URL DI BAWAH DENGAN LINK GITHUB PAGES ANDA
        return WebView(url='https://Cyberdeall.github.io/Ngaos.github.io/')

if __name__ == '__main__':
    NgaosApp().run()

