@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@IF "%__MVNW_ARG0_NAME__%"=="" (SET "BASE_DIR=%~dp0") ELSE (SET "BASE_DIR=%__MVNW_ARG0_NAME__%")
@SET MAVEN_PROJECTBASEDIR=%BASE_DIR%
@SET MAVEN_HOME=
@SET JAVA_HOME_HINT=
@SET "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
@SET "WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain"
@SET DOWNLOAD_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar"

@IF NOT "%MVNW_VERBOSE%"=="" (
  @ECHO Maven Wrapper version 3.3.2 (only Bundled)
)

@IF NOT EXIST "%WRAPPER_JAR%" (
  @ECHO Downloading Maven Wrapper...
  @powershell -Command "& {Invoke-WebRequest -Uri %DOWNLOAD_URL% -OutFile '%WRAPPER_JAR%'}"
)

@IF NOT "%JAVA_HOME%"=="" (
  @SET JAVA_EXE="%JAVA_HOME%/bin/java.exe"
) ELSE (
  @SET JAVA_EXE="java"
)

%JAVA_EXE% -classpath "%WRAPPER_JAR%" "%WRAPPER_LAUNCHER%" %MAVEN_PROJECTBASEDIR% %*
