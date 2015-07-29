all: build copy_assets

build:
	electron-packager . ForecastPlayer --asar --platform=darwin --arch=x64 --version=0.28.1 --overwrite

copy_assets:
	cp assets/app_icon.icns ForecastPlayer-darwin-x64/ForecastPlayer.app/Contents/Resources/atom.icns