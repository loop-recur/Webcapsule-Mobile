/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2011 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#import "TiBase.h"
#import "TopTiModule.h"
#import "KrollBridge.h"
#import "TiApp.h"
#import "TiUtils.h"

@implementation TopTiModule

-(id)version
{
<<<<<<< HEAD
	return @"1.6.2";
=======
	return @"1.6.1";
>>>>>>> 55fdbf490da727be6e7e0fc21a5edab2f316e81b
}

-(id)buildDate
{
<<<<<<< HEAD
	return @"04/18/11 17:16";
=======
	return @"03/15/11 11:45";
>>>>>>> 55fdbf490da727be6e7e0fc21a5edab2f316e81b
}

-(id)buildHash
{
<<<<<<< HEAD
	return @"878906d";
=======
	return @"2fdc0c5";
>>>>>>> 55fdbf490da727be6e7e0fc21a5edab2f316e81b
}

-(id)userAgent
{
	return [[TiApp app] userAgent];
}

-(void)include:(NSArray*)jsfiles
{
	for (id file in jsfiles)
	{
		// only allow includes that are local to our execution context url
		// for security, refuse to load non-compiled in Javascript code
		NSString *rootPath = [[self _baseURL] path];
		NSURL *url = [[NSURL fileURLWithPath:[NSString stringWithFormat:@"%@/%@",rootPath,file]] standardizedURL];
#ifdef DEBUG
		NSLog(@"[DEBUG] include url: %@",[url absoluteString]);
#endif
		[[self executionContext] evalFile:[url absoluteString]];
	}
}

#ifdef DEBUG
// an internal include that works with absolute URLs (debug mode only)
-(void)includeAbsolute:(NSArray*)jsfiles
{
	for (id file in jsfiles)
	{
		NSLog(@"[DEBUG] absolute url: %@", file);

		NSURL *url = nil;
		if (![file hasPrefix:@"file:"]) {
			url = [NSURL URLWithString:file];
		} else {
			url = [[NSURL fileURLWithPath:file] standardizedURL];
		}
		NSLog(@"[DEBUG] include absolute url: %@", [url absoluteString]);
		[[self executionContext] evalFile:[url absoluteString]];
	}
}
#endif
@end
